const Router = require("express").Router();
const { DatabaseErrors, SecurityErrors } = require("../errors");
const Cloudinary = require("../libs/Cloudinary");
const Multer = require("../middlewares/multer");


Router.get("/profile/:userId?", (req, res, next) => {
    if (!req.params.userId) {
        if (req.user) return res.status(200).send({
            displayName: req.user.details.display_name,
        });

        return next(SecurityErrors.AuthenticationError());
    }
});

Router.post("/profile", Multer.single("profilePicture"), async (req, res, next) => {
    console.log(req.file);
    if (!req.file) return res.sendStatus(500);

    let result;

    try {
        result = await Cloudinary.streamImageBuffer(req.file.buffer, "test");
    } catch (error) {
        return next(DatabaseErrors.CloudinaryUploadError(error.message));
    }

    console.log(result);
    return res.sendStatus(204);
});

module.exports = Router;
