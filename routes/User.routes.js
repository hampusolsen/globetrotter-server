const Router = require("express").Router();
const { AuthenticationError } = require("../errors/SecurityErrors");

Router.get("/profile/:userId?", (req, res, next) => {
    if (!req.params.userId) {
        if (req.user) return res.status(200).send({
            displayName: req.user.details.display_name,
        });

        return next(AuthenticationError());
    }
});

module.exports = Router;
