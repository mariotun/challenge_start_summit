// ===== src/services/templateService.js =====
class TemplateService {
  // Procesar plantillas dinámicas en la respuesta
  processTemplate(responseBody, requestData) {
    if (typeof responseBody !== 'string') {
      return responseBody;
    }

    let processed = responseBody;

    // Reemplazar variables simples del request
    processed = this._replaceRequestVariables(processed, requestData);
    
    // Procesar lógica condicional básica
    processed = this._processConditionals(processed, requestData);
    
    // Generar valores dinámicos
    processed = this._generateDynamicValues(processed);

    // Intentar parsear como JSON si es posible
    try {
      return JSON.parse(processed);
    } catch {
      return processed;
    }
  }

  _replaceRequestVariables(template, requestData) {
    // Reemplazar {{query.param}}
    template = template.replace(/\{\{query\.(\w+)\}\}/g, (match, param) => {
      return requestData.query[param] || match;
    });

    // Reemplazar {{body.param}}
    template = template.replace(/\{\{body\.(\w+)\}\}/g, (match, param) => {
      return requestData.body[param] || match;
    });

    // Reemplazar {{header.param}}
    template = template.replace(/\{\{header\.(\w+)\}\}/g, (match, param) => {
      return requestData.headers[param.toLowerCase()] || match;
    });

    return template;
  }

  _processConditionals(template, requestData) {
    // Lógica condicional básica: {{if query.usuario === 'admin'}}admin_content{{else}}user_content{{/if}}
    return template.replace(/\{\{if\s+(.+?)\}\}(.*?)\{\{else\}\}(.*?)\{\{\/if\}\}/gs, (match, condition, trueContent, falseContent) => {
      if (this._evaluateCondition(condition, requestData)) {
        return trueContent;
      } else {
        return falseContent;
      }
    });
  }

  _evaluateCondition(condition, requestData) {
    // Evaluación simple de condiciones
    // Formato: query.usuario === 'admin'
    const regex = /(\w+)\.(\w+)\s*(===|==|!=)\s*['"](.+?)['"]/;
    const match = condition.match(regex);
    
    if (!match) return false;
    
    const [, source, param, operator, value] = match;
    let actualValue;

    switch (source) {
      case 'query':
        actualValue = requestData.query[param];
        break;
      case 'body':
        actualValue = requestData.body[param];
        break;
      case 'header':
        actualValue = requestData.headers[param.toLowerCase()];
        break;
      default:
        return false;
    }

    switch (operator) {
      case '===':
      case '==':
        return actualValue === value;
      case '!=':
        return actualValue !== value;
      default:
        return false;
    }
  }

  _generateDynamicValues(template) {
    // {{timestamp}}
    template = template.replace(/\{\{timestamp\}\}/g, () => new Date().toISOString());
    
    // {{uuid}}
    template = template.replace(/\{\{uuid\}\}/g, () => require('uuid').v4());
    
    // {{random.number}}
    template = template.replace(/\{\{random\.number\}\}/g, () => Math.floor(Math.random() * 1000));

    return template;
  }
}

module.exports = new TemplateService();
