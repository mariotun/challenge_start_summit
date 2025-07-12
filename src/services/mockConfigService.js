// ===== src/services/mockConfigService.js =====
const MockConfig = require('../models/mockConfig');
const storage = require('../storage/memoryStorage');

class MockConfigService {
  // Crear nueva configuración de mock
  createMock(configData) {
    const mockConfig = new MockConfig(configData);
    return storage.create(mockConfig);
  }

  // Obtener todas las configuraciones
  getAllMocks() {
    return storage.getAll();
  }

  // Obtener configuración por ID
  getMockById(id) {
    const config = storage.getById(id);
    if (!config) {
      const error = new Error('Mock configuration not found');
      error.status = 404;
      throw error;
    }
    return config;
  }

  // Eliminar configuración
  deleteMock(id) {
    const deleted = storage.delete(id);
    if (!deleted) {
      const error = new Error('Mock configuration not found');
      error.status = 404;
      throw error;
    }
    return true;
  }

  // Obtener estadísticas
  getStats() {
    return storage.getStats();
  }
}

module.exports = new MockConfigService();
