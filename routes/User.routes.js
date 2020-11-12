const Router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { AuthenticationError } = require("../errors/SecurityErrors");


Router.get("/profile/:userId?", (req, res, next) => {
    if (!req.params.userId) {
        if (req.user) return res.status(200).send({
            displayName: req.user.details.display_name,
        });

        return next(AuthenticationError());
    }
});

Router.post("/profile", multer().single("profilePicture"), async (req, res, next) => {
    console.log(req.file);
    if (!req.file) return res.sendStatus(500);

    const response = await cloudinary.uploader.upload(req.file);

    console.log(response);

    return res.status(201).send(response);
});

module.exports = Router;
