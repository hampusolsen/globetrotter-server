const expressSession = require("express-session");
const Store = require("connect-redis")(expressSession);
const client = require("../config/cache");
const config = require("../config");

module.exports = function session() {
    return expressSession({
        store: new Store({
            client,
            ttl: parseInt(config.TOKEN_SHORT_LIVED) / 1000,
        }),
        secret: config.SESSION_TOKEN_SECRET,
        saveUninitialized: true,
        resave: false,
        name: "qid",
        cookie: {
            secure: config.BEHIND_PROXY,
            httpOnly: true,
            maxAge: parseInt(config.TOKEN_SHORT_LIVED),
            sameSite: "lax",
        },
    });
};
