// ===== src/middleware/logger.js =====
const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log del request
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // Capturar cuando termine la respuesta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusEmoji = res.statusCode >= 400 ? '[ERROR]' : '[OK]';
    console.log(`${statusEmoji} ${res.statusCode} ${req.method} ${req.url} - ${duration}ms`);
  });

  next();
};

module.exports = logger;

