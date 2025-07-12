// ===== src/middleware/errorHandler.js =====
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validación
  if (err.status === 400) {
    return res.status(400).json({
      error: true,
      message: err.message,
      details: err.details,
      timestamp: new Date().toISOString()
    });
  }

  // Error 404
  if (err.status === 404) {
    return res.status(404).json({
      error: true,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Error genérico del servidor
  res.status(500).json({
    error: true,
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
