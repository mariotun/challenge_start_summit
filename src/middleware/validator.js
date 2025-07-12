// ===== src/middleware/validator.js =====
const { validateMockConfig } = require('../utils/validators');

const validator = {
  validateMockConfigMiddleware: (req, res, next) => {
    try {
      req.validatedData = validateMockConfig(req.body);
      next();
    } catch (error) {
      res.status(error.status || 400).json({
        error: true,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString()
      });
    }
  }
};

module.exports = validator;
