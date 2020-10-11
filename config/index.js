const securityConfiguration = require('./security');
const { databaseConfiguration } = require('./database');

const { NODE_ENV, BEHIND_PROXY } = process.env;

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
const BASE_URI = `http://${HOST}:${PORT}/`;

const TOKEN_SHORT_LIVED = 1000 * 60 * 15;
const TOKEN_LONG_LIVED = 1000 * 60 * 60 * 24 * 365;

module.exports = {
  TOKEN_SHORT_LIVED,
  TOKEN_LONG_LIVED,
  BEHIND_PROXY,
  PORT,
  HOST,
  BASE_URI,
  NODE_ENV,
  ...securityConfiguration,
  ...databaseConfiguration,
};
