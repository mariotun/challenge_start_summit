// ===== src/services/matchingService.js =====
const storage = require('../storage/memoryStorage');

class MatchingService {
  // Buscar configuración que coincida con el request
  findMatchingConfig(request) {
    return storage.findMatch(request);
  }

  // Preparar el objeto request para matching
  prepareRequest(req) {
    // Usar originalUrl y limpiar query parameters
    const route = req.originalUrl.split('?')[0];
    
    return {
      route: route, // Usar originalUrl en lugar de req.path
      method: req.method,
      query: req.query || {},
      body: req.body || {},
      headers: this._normalizeHeaders(req.headers)
    };
  }

  // Normalizar headers para matching consistente
  _normalizeHeaders(headers) {
    const normalized = {};
    for (const [key, value] of Object.entries(headers)) {
      normalized[key.toLowerCase()] = value;
    }
    return normalized;
  }
}

module.exports = new MatchingService();