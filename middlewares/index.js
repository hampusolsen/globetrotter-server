const cors = require('cors');
const logger = require('./logger');
const session = require('./session');
const { BASE_URI } = require('../config');

module.exports = function loadMiddlewares(app) {
  // Logs time method, route, status code and response time
  app.use(logger);

  // Basic CORS settings
  app.use(
    cors({
      origin: BASE_URI,
      credentials: true,
    })
  );

  app.use(session);
};
