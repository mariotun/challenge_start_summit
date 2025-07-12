// ===== src/utils/validators.js =====
const Joi = require('joi');

const mockConfigSchema = Joi.object({
  route: Joi.string().required().pattern(/^\/.*/).message('Route must start with /'),
  method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD').required(),
  queryParams: Joi.object().optional(),
  bodyParams: Joi.object().optional(),
  headers: Joi.object().optional(),
  statusCode: Joi.number().integer().min(100).max(599).optional().default(200),
  responseBody: Joi.alternatives().try(Joi.string(), Joi.object(), Joi.array()).required(),
  contentType: Joi.string().optional().default('application/json')
});

const validators = {
  validateMockConfig: (data) => {
    const { error, value } = mockConfigSchema.validate(data, { abortEarly: false });
    if (error) {
      const details = error.details.map(detail => detail.message);
      const validationError = new Error('Validation failed');
      validationError.status = 400;
      validationError.details = details;
      throw validationError;
    }
    return value;
  }
};

module.exports = validators;
