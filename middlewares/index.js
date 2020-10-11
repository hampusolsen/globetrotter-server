const cors = require('cors');
const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const { BASE_URI } = require('../config');
const session = require('./session');
const passport = require('../config/passport');

module.exports = function loadMiddlewares(app) {
  app.use(logger());

  app.use(
    cors({
      origin: BASE_URI,
      credentials: true,
    })
  );

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session());
  app.use(passport.initialize());
  app.use(passport.session());
};
