// ===== src/controllers/mockController.js =====
const mockConfigService = require('../services/mockConfigService');
const responseBuilder = require('../utils/responseBuilder');

class MockController {
  // POST /configure-mock - Crear nueva configuración
  async createMock(req, res, next) {
    try {
      const mockConfig = mockConfigService.createMock(req.validatedData);
      responseBuilder.buildSuccessResponse(
        res, 
        mockConfig, 
        201, 
        'Mock creado correctamente !!!'
      );
    } catch (error) {
      next(error);
    }
  }

  // GET /configure-mock - Obtener todas las configuraciones
  async getAllMocks(req, res, next) {
    try {
      const mocks = mockConfigService.getAllMocks();
      responseBuilder.buildSuccessResponse(res, mocks);
    } catch (error) {
      next(error);
    }
  }

  // GET /configure-mock/stats - Obtener estadísticas
  async getStats(req, res, next) {
    try {
      const stats = mockConfigService.getStats();
      responseBuilder.buildSuccessResponse(res, stats);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /configure-mock/:id - Eliminar configuración
  async deleteMock(req, res, next) {
    try {
      const { id } = req.params;
      mockConfigService.deleteMock(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // DELETE /configure-mock - Limpiar todas las configuraciones
  async clearAllMocks(req, res, next) {
    try {
      const storage = require('../storage/memoryStorage');
      storage.clear();
      responseBuilder.buildSuccessResponse(res, null, 200, 'Se limpiaron todas las configuraciones de Mock correctamente !!!');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MockController();