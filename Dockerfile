# ===== Dockerfile =====
FROM node:18-alpine

WORKDIR /app

# Copiar solo package.json (sin package-lock.json)
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY src/ ./src/
COPY server.js ./

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]