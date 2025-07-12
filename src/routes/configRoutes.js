// ===== src/routes/configRoutes.js =====
const express = require('express');
const router = express.Router();
const mockController = require('../controllers/mockController');
const { validateMockConfigMiddleware } = require('../middleware/validator');

// POST /configure-mock - Crear nueva configuración
router.post('/', validateMockConfigMiddleware, mockController.createMock);

// GET /configure-mock - Obtener todas las configuraciones
router.get('/', mockController.getAllMocks);

// GET /configure-mock/stats - Obtener estadísticas
router.get('/stats', mockController.getStats);

// DELETE /configure-mock - Limpiar todas las configuraciones
router.delete('/', mockController.clearAllMocks);

// DELETE /configure-mock/:id - Eliminar configuración específica
router.delete('/:id', mockController.deleteMock);

module.exports = router;