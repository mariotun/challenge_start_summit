// ===== src/storage/memoryStorage.js =====
class MemoryStorage {
  constructor() {
    this.configs = new Map();
  }

  // Crear nueva configuración
  create(config) {
    this.configs.set(config.id, config);
    return config;
  }

  // Obtener todas las configuraciones
  getAll() {
    return Array.from(this.configs.values());
  }

  // Obtener configuración por ID
  getById(id) {
    return this.configs.get(id);
  }

  // Eliminar configuración
  delete(id) {
    return this.configs.delete(id);
  }

  // Buscar configuración que coincida con el request
  findMatch(request) {
    console.log('Almacenamiento: Buscando coincidencia en ', this.configs.size, ' configuraciones');
    
    for (const config of this.configs.values()) {
      console.log('Comprobando la configuración:', {
        id: config.id,
        route: config.route,
        method: config.method
      });
      
      if (config.matches(request)) {
        console.log('[OK]Coincidencia encontrada:', config.id);
        return config;
      }
    }
    
    console.log('[ERROR]No se encontró ninguna coincidencia en el almacenamiento');
    return null;
  }

  // Limpiar todas las configuraciones (útil para tests)
  clear() {
    this.configs.clear();
  }

  // Obtener estadísticas
  getStats() {
    return {
      totalConfigs: this.configs.size,
      byMethod: this._groupByMethod(),
      byRoute: this._groupByRoute()
    };
  }

  _groupByMethod() {
    const groups = {};
    for (const config of this.configs.values()) {
      groups[config.method] = (groups[config.method] || 0) + 1;
    }
    return groups;
  }

  _groupByRoute() {
    const groups = {};
    for (const config of this.configs.values()) {
      groups[config.route] = (groups[config.route] || 0) + 1;
    }
    return groups;
  }
}

// Singleton instance
const storage = new MemoryStorage();
module.exports = storage;