# **API para Mocks de Servicios REST**

## 📋 Descripción

API desarrollada para simular el comportamiento de servicios externos mediante mocks configurables dinámicamente. Facilita el desarrollo y las pruebas de sistemas que dependen de servicios externos, permitiendo definir respuestas personalizadas según la configuración especificada.

## 🚀 Características Principales

- ✅ **Configuración Dinámica**: Creación de mocks en tiempo real sin reiniciar el servidor
- ✅ **Matching Inteligente**: Coincidencia por ruta, método HTTP, parámetros, headers y body
- ✅ **Plantillas Dinámicas**: Respuestas con variables y lógica condicional
- ✅ **Múltiples Content-Types**: Soporte para JSON, XML, texto plano
- ✅ **Gestión Completa**: CRUD de configuraciones con estadísticas
- ✅ **Containerización**: Listo para Docker y Docker Compose

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **Validación**: Joi
- **Containerización**: Docker + Docker Compose
- **Almacenamiento**: In-memory (escalable a BD)

## 📦 Instalación y Ejecución

### Opción 1: Ejecución Local

#### Requisitos Previos
- Node.js 18+ 
- npm

#### Pasos de Instalación
```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Challenge-Start-Summit-2025

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Ejecutar en modo producción
npm start
```

La API estará disponible en: `http://localhost:3000`

### Opción 2: Ejecución con Docker

#### Requisitos Previos
- Docker
- Docker Compose

#### Pasos de Instalación
```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Challenge-Start-Summit-2025

# 2. Ejecutar con Docker Compose
docker-compose up --build

# 3. Ejecutar en segundo plano
docker-compose up -d --build
```

La API estará disponible en: `http://localhost:3000`

#### Comandos Docker Útiles
```bash
# Ver logs
docker-compose logs -f

# Parar contenedores
docker-compose down

# Reconstruir imagen
docker-compose up --build
```

## 🔧 Verificación de Instalación

```bash
# Health check
curl http://localhost:3000/health

# Respuesta esperada:
# {"status": "OK", "timestamp": "2025-07-12T..."}
```

## 📚 Uso de la API

### Endpoints Administrativos

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/health` | GET | Health check del servidor |
| `/configure-mock` | POST | Crear nueva configuración |
| `/configure-mock` | GET | Listar todas las configuraciones |
| `/configure-mock/stats` | GET | Obtener estadísticas |
| `/configure-mock/:id` | DELETE | Eliminar configuración específica |
| `/configure-mock` | DELETE | Limpiar todas las configuraciones |

### Endpoints de Mocks

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/*` | ANY | Cualquier ruta configurada como mock |

## 📖 Ejemplos de Uso

### 1. Crear Mock Básico

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/productos",
    "method": "GET",
    "statusCode": 200,
    "responseBody": {
      "productos": ["producto1", "producto2"],
      "total": 2
    },
    "contentType": "application/json"
  }'
```

**Probar el mock:**
```bash
curl http://localhost:3000/api/v1/productos
```

### 2. Mock con Query Parameters

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/usuarios",
    "method": "GET",
    "queryParams": {"tipo": "admin"},
    "statusCode": 200,
    "responseBody": {
      "usuario": "admin",
      "permisos": ["leer", "escribir", "eliminar"]
    },
    "contentType": "application/json"
  }'
```

**Probar:**
```bash
curl "http://localhost:3000/api/v1/usuarios?tipo=admin"
```

### 3. Mock con Body Parameters (POST)

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/login",
    "method": "POST",
    "bodyParams": {
      "email": "admin@test.com",
      "password": "123456"
    },
    "statusCode": 200,
    "responseBody": {
      "token": "abc123xyz",
      "user": "admin",
      "expires": "2025-12-31"
    },
    "contentType": "application/json"
  }'
```

**Probar:**
```bash
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "123456"}'
```

### 4. Mock con Headers

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/profile",
    "method": "GET",
    "headers": {"authorization": "Bearer token123"},
    "statusCode": 200,
    "responseBody": {
      "name": "Usuario Admin",
      "role": "admin",
      "permissions": ["read", "write", "delete"]
    },
    "contentType": "application/json"
  }'
```

**Probar:**
```bash
curl http://localhost:3000/api/v1/profile \
  -H "Authorization: Bearer token123"
```

### 5. Mock con Lógica Condicional

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/data",
    "method": "GET",
    "statusCode": 200,
    "responseBody": "{{if query.user === \"admin\"}}{\\"data\\": \\"admin_data\\", \\"access\\": \\"full\\"}{{else}}{\\"data\\": \\"user_data\\", \\"access\\": \\"limited\\"}{{/if}}",
    "contentType": "application/json"
  }'
```

**Probar como admin:**
```bash
curl "http://localhost:3000/api/v1/data?user=admin"
```

**Probar como usuario normal:**
```bash
curl "http://localhost:3000/api/v1/data?user=normal"
```

### 6. Mock con Variables Dinámicas

```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/timestamp",
    "method": "GET",
    "statusCode": 200,
    "responseBody": "{\\"timestamp\\": \\"{{timestamp}}\\", \\"uuid\\": \\"{{uuid}}\\", \\"random\\": {{random.number}}}",
    "contentType": "application/json"
  }'
```

**Probar:**
```bash
curl http://localhost:3000/api/v1/timestamp
```

### 7. Mock con Diferentes Content-Types

**Respuesta XML:**
```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/xml-data",
    "method": "GET",
    "statusCode": 200,
    "responseBody": "<?xml version=\"1.0\"?><response><message>Hello XML</message><timestamp>{{timestamp}}</timestamp></response>",
    "contentType": "text/xml"
  }'
```

**Respuesta de Error:**
```bash
curl -X POST http://localhost:3000/configure-mock \
  -H "Content-Type: application/json" \
  -d '{
    "route": "/api/v1/error",
    "method": "GET",
    "statusCode": 500,
    "responseBody": {
      "error": "Internal server error",
      "code": 500,
      "timestamp": "{{timestamp}}"
    },
    "contentType": "application/json"
  }'
```

### 8. Gestión de Configuraciones

```bash
# Listar todas las configuraciones
curl http://localhost:3000/configure-mock

# Obtener estadísticas
curl http://localhost:3000/configure-mock/stats

# Eliminar configuración específica (usar ID del listado)
curl -X DELETE http://localhost:3000/configure-mock/{ID}

# Limpiar todas las configuraciones
curl -X DELETE http://localhost:3000/configure-mock
```

## 🏗️ Arquitectura y Decisiones de Diseño

### Arquitectura General

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │    │    Services     │    │    Storage      │
│                 │    │                 │    │                 │
│ • mockController│◄──►│• mockConfigSvc  │◄──►│ • memoryStorage │
│ • proxyCtrl     │    │• matchingSvc    │    │                 │
│                 │    │• templateSvc    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Middleware    │    │     Models      │    │     Utils       │
│                 │    │                 │    │                 │
│ • validator     │    │ • mockConfig    │    │ • responseBuilder│
│ • errorHandler  │    │                 │    │ • validators    │
│ • logger        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Componentes Principales

#### **1. Controllers (Capa de Presentación)**
- **mockController**: Gestiona las operaciones CRUD de configuraciones
- **proxyController**: Maneja las solicitudes hacia los mocks configurados

#### **2. Services (Lógica de Negocio)**
- **mockConfigService**: Lógica para gestionar configuraciones
- **matchingService**: Algoritmo de matching entre requests y configuraciones
- **templateService**: Procesamiento de plantillas dinámicas y variables

#### **3. Models (Modelos de Datos)**
- **mockConfig**: Modelo que define la estructura y comportamiento de una configuración

#### **4. Storage (Persistencia)**
- **memoryStorage**: Almacenamiento en memoria con Map para búsquedas O(1)

#### **5. Middleware (Interceptores)**
- **validator**: Validación de datos de entrada con Joi
- **errorHandler**: Manejo centralizado de errores
- **logger**: Logging estructurado de requests/responses

#### **6. Utils (Utilidades)**
- **responseBuilder**: Construcción consistente de respuestas HTTP
- **validators**: Esquemas de validación reutilizables

### Decisiones de Diseño

#### **1. Arquitectura por Capas**
**Decisión**: Separación clara entre Controllers, Services, Models y Storage.
</br>
**Razón**: 
- Facilita el testing unitario
- Permite evolución independiente de cada capa
- Mejora la mantenibilidad y legibilidad del código

#### **2. Almacenamiento In-Memory**
**Decisión**: Uso de Map() nativo de JavaScript para storage.
</br>
**Razón**:
- Simplicidad para MVP y desarrollo
- Performance O(1) para operaciones básicas
- Fácil migración a base de datos real
- Sin dependencias externas

#### **3. Engine de Templates Personalizado**
**Decisión**: Implementación propia en lugar de usar librerías como Handlebars
</br>
**Razón**:
- Control total sobre la funcionalidad
- Menor overhead y dependencias
- Lógica específica para casos de uso de mocking

#### **4. Matching por Coincidencia Exacta**
**Decisión**: Los parámetros configurados deben coincidir exactamente.
</br>
**Razón**:
- Comportamiento predecible y determinístico
- Evita ambigüedades en el matching
- Simplifica la lógica de búsqueda

#### **5. Catch-All Routes**
**Decisión**: Usar Express wildcard (`*`) para capturar todas las rutas.
</br>
**Razón**:
- Flexibilidad total para cualquier ruta configurada
- No requiere registro dinámico de rutas en Express
- Simplifica la arquitectura del router

#### **6. Validación con Joi**
**Decisión**: Joi para validación de esquemas.
</br>
**Razón**:
- Validación declarativa y expresiva
- Mensajes de error claros y personalizables
- Ampliamente adoptado en el ecosistema Node.js

#### **7. Containerización con Docker**
**Decisión**: Dockerfile multi-stage y Docker Compose.
</br>
**Razón**:
- Consistencia entre entornos
- Fácil despliegue y escalabilidad
- Aislamiento de dependencias

### Flujo de Datos

#### **Configuración de Mock**
```
HTTP Request → Validator → mockController → mockConfigService → memoryStorage
```

#### **Ejecución de Mock**
```
HTTP Request → proxyController → matchingService → templateService → responseBuilder → HTTP Response
```

### Escalabilidad y Extensibilidad

#### **Storage Layer**
El diseño permite migrar fácilmente a diferentes tipos de almacenamiento:
- Base de datos relacional (PostgreSQL, MySQL)
- Base de datos NoSQL (MongoDB, Redis)
- Sistemas distribuidos (Elasticsearch, DynamoDB)

#### **Template Engine**
El motor de plantillas es extensible para soportar:
- Más funciones matemáticas y de fecha
- Integración con APIs externas
- Plantillas más complejas con bucles

#### **Matching Engine**
El algoritmo de matching puede evolucionar para soportar:
- Wildcards y regex en rutas
- Matching parcial de parámetros
- Priorización configurable de reglas


## 🔒 Seguridad

- Validación estricta de todos los inputs
- Sanitización de templates para evitar code injection
- Headers de seguridad básicos (CORS)
- Rate limiting (recomendado para producción)

## 📈 Performance

- Almacenamiento O(1) para operaciones básicas
- Matching eficiente con early exit
- Templates compilados en memoria
- Logging asíncrono para no bloquear requests

## 🚀 Roadmap y Mejoras Futuras

- [ ] Persistencia en base de datos
- [ ] Interfaz web para gestión visual
- [ ] Métricas y analytics avanzados
- [ ] Soporte para WebSockets
- [ ] A/B Testing con múltiples respuestas
- [ ] Import/Export de configuraciones
- [ ] Rate limiting configurable
- [ ] Authentication y autorización

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, por favor abre un [issue](https://github.com/usuario/repo/issues) en GitHub.

---

