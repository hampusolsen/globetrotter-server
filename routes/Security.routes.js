const Router = require("express").Router();
const { GOOGLE, FACEBOOK, LOCAL, REGISTER_LOCALLY, AUTHENTICATE_LOCALLY } = require("../config/constants");
const passport = require("../middlewares/passport");

const redirectRoutes = {
    failureRedirect: "/api/security/failure",
    successRedirect: "/api/security/second-step",
};

// Google
Router.get(
    "/google",
    passport.authenticate(GOOGLE, { scope: ["profile", "email"] })
);

Router.get("/google/redirect", passport.authenticate(GOOGLE, redirectRoutes));

// Facebook
Router.get(
    "/facebook",
    passport.authenticate(FACEBOOK, { scope: ["profile"] })
);

Router.get(
    "/facebook/redirect",
    passport.authenticate(FACEBOOK, redirectRoutes)
);

// Local
Router.post(
    "/local/authenticate",
    passport.authenticate(AUTHENTICATE_LOCALLY, redirectRoutes),
    (req, res, next) => {
        console.log(req.session);
        res.send("oK");
    }
);

Router.post(
    "/local/register",
    passport.authenticate(REGISTER_LOCALLY, redirectRoutes)
);

// General
Router.delete("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/welcome");
});

Router.get("/second-step", (req, res, next) => {
    console.log(req.user);
    console.log(req.session);
    res.send(req.user);
});

module.exports = Router;
