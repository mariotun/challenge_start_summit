// ===== src/routes/proxyRoutes.js =====
const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxyController');

// Catch-all route para manejar todos los mocks configurados
router.all('*', proxyController.handleMockRequest);

module.exports = router;
