const fs = require("fs");
const path = require("path");
const errors = require("../errors/");

module.exports = function loadRoutes(app) {
    const routes = fs.readdirSync(__dirname, "utf8");

    routes.forEach((routeFilename) => {
        const routePrefix = `/${routeFilename.split(".")[0].toLowerCase()}`;

        const routePath = path.join(__dirname, routeFilename);
        const routeModule = require(routePath);

        app.use(`/api${routePrefix}`, routeModule);
    });

    app.get("/api/test", (req, res) => {
        res.send({ hello: "world" });
    });

    app.get("/api/error", (req, res, next) => {
        next(errors.AuthorizationError());
    });
};
