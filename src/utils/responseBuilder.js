// ===== src/utils/responseBuilder.js =====
class ResponseBuilder {
  // Construir respuesta HTTP completa
  buildResponse(res, config, processedBody) {
    // Establecer content-type
    res.set('Content-Type', config.contentType);

    // Headers adicionales para CORS y debugging
    res.set('X-Mock-Config-Id', config.id);
    res.set('X-Mock-Timestamp', new Date().toISOString());

    // Enviar respuesta con el código de estado configurado
    return res.status(config.statusCode).send(processedBody);
  }

  // Construir respuesta de error estándar
  buildErrorResponse(res, statusCode, message, details = null) {
    const errorResponse = {
      error: true,
      message,
      statusCode,
      timestamp: new Date().toISOString()
    };

    if (details) {
      errorResponse.details = details;
    }

    return res.status(statusCode).json(errorResponse);
  }

  // Construir respuesta de éxito estándar
  buildSuccessResponse(res, data, statusCode = 200, message = null) {
    const response = {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };

    if (message) {
      response.message = message;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = new ResponseBuilder();
