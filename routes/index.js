const fs = require('fs');
const path = require('path');

module.exports = function loadRoutes(app) {
  const routes = fs.readdirSync(__dirname, 'utf8');

  routes.forEach((routeFilename) => {
    const routePrefix = `/${routeFilename.split('.')[0].toLowerCase()}`;

    const routePath = path.join(__dirname, routeFilename);
    const routeModule = require(routePath);

    app.use(`/api${routePrefix}`, routeModule);
  });
};
