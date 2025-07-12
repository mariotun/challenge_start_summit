// ===== server.js (root) =====
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mock API Server running on port ${PORT}`);
  console.log(`Configure mocks: POST http://localhost:${PORT}/configure-mock`);
  console.log(`View configs: GET http://localhost:${PORT}/configure-mock`);
});
