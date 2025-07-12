// ===== src/app.js =====
const express = require('express');
const cors = require('cors');
const configRoutes = require('./routes/configRoutes');
const proxyRoutes = require('./routes/proxyRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Rutas de configuración (deben ir ANTES que las rutas proxy)
app.use('/configure-mock', configRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rutas proxy (catch-all, debe ir AL FINAL)
app.use('*', proxyRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
