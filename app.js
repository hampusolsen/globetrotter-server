const app = require('express')();
const loadMiddlewares = require('./middlewares/loadMiddlewares');
const errorHandler = require('./middlewares/errorHandler');

loadMiddlewares(app);

app.use(errorHandler);

module.exports = app;
