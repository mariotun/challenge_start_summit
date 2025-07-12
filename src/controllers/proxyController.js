// ===== src/controllers/proxyController.js =====
const matchingService = require('../services/matchingService');
const templateService = require('../services/templateService');
const responseBuilder = require('../utils/responseBuilder');

class ProxyController {
  // Manejar todas las requests que no coincidan con rutas de configuración
  async handleMockRequest(req, res, next) {
    try {
      // Excluir rutas administrativas
      if (req.path.startsWith('/configure-mock') || req.path === '/health') {
        return next();
      }

      // Preparar datos del request para matching
      const requestData = matchingService.prepareRequest(req);
      
      // Debug: log del request que estamos intentando hacer match
      console.log('🔍 Trying to match request:', {
        route: requestData.route,
        method: requestData.method,
        query: requestData.query
      });
      
      // Buscar configuración que coincida
      const matchingConfig = matchingService.findMatchingConfig(requestData);
      
      if (!matchingConfig) {
        console.log('❌ No matching config found');
        return responseBuilder.buildErrorResponse(
          res, 
          404, 
          'No mock configuration found for this request',
          {
            requestedRoute: requestData.route,
            requestedMethod: requestData.method
          }
        );
      }

      console.log('✅ Found matching config:', matchingConfig.id);

      // Procesar plantillas dinámicas
      const processedBody = templateService.processTemplate(
        matchingConfig.responseBody, 
        requestData
      );

      // Construir y enviar respuesta
      responseBuilder.buildResponse(res, matchingConfig, processedBody);
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProxyController();