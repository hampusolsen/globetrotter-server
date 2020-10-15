const cors = require("cors");
const { json, urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const logger = require("./logger");
const { CLIENT_URI } = require("../config");
const session = require("./session");
const passport = require("./passport");

module.exports = function loadMiddlewares(app) {
    app.use(logger());

    app.use(
        cors({
            origin: CLIENT_URI,
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
