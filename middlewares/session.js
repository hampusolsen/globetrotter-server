const session = require('express-session');
const CacheStore = require('connect-redis')(session);
const { SESSION_TOKEN_SECRET } = require('../config');
const redisClient = require('../config/cache');

module.exports = session({
  store: new CacheStore({ client: redisClient }),
  resave: true,
  saveUninitialized: true,
  secret: SESSION_TOKEN_SECRET,
  cookie: {
    httpOnly: true,
  },
});
