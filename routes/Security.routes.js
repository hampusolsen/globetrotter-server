const Router = require("express").Router();
const { GOOGLE, FACEBOOK } = require("../config/constants");
const passport = require("../middlewares/passport");

const redirectRoutes = {
    failureRedirect: "/",
    successRedirect: "/main",
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

// General
Router.delete("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});

module.exports = Router;
