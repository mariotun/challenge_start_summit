// ===== src/models/mockConfig.js =====
const { v4: uuidv4 } = require('uuid');

class MockConfig {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.route = data.route;
    this.method = data.method.toUpperCase();
    this.queryParams = data.queryParams || {};
    this.bodyParams = data.bodyParams || {};
    this.headers = data.headers || {};
    this.statusCode = data.statusCode || 200;
    this.responseBody = data.responseBody;
    this.contentType = data.contentType || 'application/json';
    this.createdAt = new Date().toISOString();
  }

  // Verifica si esta configuración coincide con un request
  matches(request) {
    const { route, method, query, body, headers } = request;

    // Debug logging
    console.log('Intento de emparejamiento:', {
      configRoute: this.route,
      requestRoute: route,
      configMethod: this.method,
      requestMethod: method,
      routesMatch: this.route === route,
      methodsMatch: this.method === method
    });

    // Verificar ruta y método
    if (this.route !== route || this.method !== method) {
      console.log('[ERROR]Desajuste de ruta o método.');
      return false;
    }

    // Verificar query parameters
    if (!this._paramsMatch(this.queryParams, query)) {
      console.log('[ERROR]Los parámetros de consulta no coinciden.');
      return false;
    }

    // Verificar body parameters
    if (!this._paramsMatch(this.bodyParams, body)) {
      console.log('[ERROR]Los parámetros corporales no coinciden.');
      return false;
    }

    // Verificar headers
    if (!this._headersMatch(this.headers, headers)) {
      console.log('[ERROR]Los encabezados no coinciden');
      return false;
    }

    console.log('[OK]Coincidencia completa encontrada !!!');
    return true;
  }

  _paramsMatch(configParams, requestParams) {
    if (!configParams || Object.keys(configParams).length === 0) {
      return true; // No hay parámetros configurados, coincide
    }

    for (const [key, value] of Object.entries(configParams)) {
      if (requestParams[key] !== value) {
        return false;
      }
    }
    return true;
  }

  _headersMatch(configHeaders, requestHeaders) {
    if (!configHeaders || Object.keys(configHeaders).length === 0) {
      return true;
    }

    for (const [key, value] of Object.entries(configHeaders)) {
      const headerKey = key.toLowerCase();
      const requestValue = requestHeaders[headerKey];
      
      // Soporte para wildcards básicos
      if (value === '*' && requestValue) {
        continue;
      }
      
      if (requestValue !== value) {
        return false;
      }
    }
    return true;
  }
}

module.exports = MockConfig;