const cors = require('cors');

module.exports = function loadMiddlewares(app) {
  app.use(
    cors({
      origin: 'http://localhost:3000/',
      credentials: true,
    })
  );
};
