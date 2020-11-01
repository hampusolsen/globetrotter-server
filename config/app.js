const { NODE_ENV } = require(".");
const { PRODUCTION } = require("./constants");

module.exports = function loadSettings(app) {
    app.disable("x-powered-by");
    app.set("trust proxy", (ip) => {
        console.log(`Behind proxy on IP-address '${ip}.'`);

        if (NODE_ENV === PRODUCTION) return true;
        return false;
    });
};
