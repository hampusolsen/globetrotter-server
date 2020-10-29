const expressSession = require("express-session");
const Store = require("connect-redis")(expressSession);
const client = require("../config/cache");
const config = require("../config");

module.exports = function session() {
    return expressSession({
        store: new Store({ client }),
        secret: config.SESSION_TOKEN_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: config.BEHIND_PROXY,
            httpOnly: true,
            maxAge: config.TOKEN_SHORT_LIVED,
            sameSite: "lax",
        },
    });
};
