const app = require('express')();
const loadSettings = require('./config/app');
const loadMiddlewares = require('./middlewares');
const loadRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

loadSettings(app);
loadMiddlewares(app);
loadRoutes(app);

app.use(errorHandler());

module.exports = app;
