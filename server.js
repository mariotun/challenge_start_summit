// ===== server.js (root) =====
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor API MOCK ejecutándose en el puerto ${PORT}`);
  console.log(`Configurar MOCKS: POST http://localhost:${PORT}/configure-mock`);
  console.log(`Ver Configuraciones: GET http://localhost:${PORT}/configure-mock`);
});
