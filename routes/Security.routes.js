const Router = require("express").Router();
const { GOOGLE, FACEBOOK, REGISTER_LOCALLY, AUTHENTICATE_LOCALLY } = require("../config/constants");
const { CLIENT_URI } = require("../config");
const passport = require("../middlewares/passport");
const { validateUserCredentials } = require("../validations/Security.validation");

const redirectOptions = {
    failureRedirect: `${CLIENT_URI}/`,
    successRedirect: `${CLIENT_URI}/my`
};

const scopeOptions = {
    scope: ["profile", "email"]
};

function sendConfirmation(req, res, _next) {
    console.log(req.session);
    console.log(req.user);
    res.sendStatus(204);
}

// Google
Router.get(
    "/google",
    passport.authenticate(GOOGLE, scopeOptions),
);

Router.get(
    "/google/redirect",
    passport.authenticate(GOOGLE, redirectOptions),
);

// Facebook
Router.get(
    "/facebook",
    passport.authenticate(FACEBOOK, scopeOptions),
);

Router.get(
    "/facebook/redirect",
    passport.authenticate(FACEBOOK, redirectOptions),
);

// Local
Router.post(
    "/local/authenticate",
    validateUserCredentials(),
    passport.authenticate(AUTHENTICATE_LOCALLY),
    sendConfirmation
);

Router.post(
    "/local/register",
    validateUserCredentials(),
    passport.authenticate(REGISTER_LOCALLY),
    sendConfirmation
);

// General
Router.delete(
    "/logout",
    (req, res) => {
        req.logout();
        res.sendStatus(204);
    }
);

module.exports = Router;
