const { BEHIND_PROXY } = require('.');

module.exports = function loadSettings(app) {
  app.set('trust proxy', (ip) => {
    console.log(`Behind proxy '${ip}.'`);
    if (BEHIND_PROXY) return true;
    return false;
  });
};
