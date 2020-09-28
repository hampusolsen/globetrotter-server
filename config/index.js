const applicationConfiguration = require('./app');
const databaseConfiguration = require('./database');

module.exports = function loadConfiguration() {
  return {
    ...applicationConfiguration,
    ...databaseConfiguration,
  };
};
