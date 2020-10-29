const Router = require("express").Router();
const { GOOGLE, FACEBOOK, REGISTER_LOCALLY, AUTHENTICATE_LOCALLY } = require("../config/constants");
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

Router.get(
    "/google/redirect",
    passport.authenticate(GOOGLE, { failureRedirect: "http://localhost:3000/welcome" }),
    (req, res, next) => {
        console.log("yey!", req.user);
        res.redirect("http://localhost:3000/");
    }
);

// Facebook
Router.get(
    "/facebook",
    passport.authenticate(FACEBOOK, { scope: ["profile", "email"] })
);

Router.get(
    "/facebook/redirect",
    passport.authenticate(FACEBOOK),
    (req, res, next) => {
        console.log("yey!", req.user);
        res.redirect("http://localhost:3000/");
    }
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
Router.delete(
    "/logout",
    (req, res, next) => {
        req.logout();
        res.redirect("/welcome");
    }
);

Router.get(
    "/second-step",
    (req, res, next) => {
        res.send(req.user);
    }
);

module.exports = Router;
