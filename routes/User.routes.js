const Router = require("express").Router();
const { DatabaseErrors, SecurityErrors } = require("../errors");
const Cloudinary = require("../libs/Cloudinary");
const upload = require("../middlewares/upload");

Router.get("/profile/:userId?", async (req, res, next) => {
    if (!req.params.userId) {

        if (req.user) return res.status(200).send({
            ...req.user.details,
            travels: req.user.travels,
            followers: req.user.followers,
            following: req.user.following
        });

        return next(SecurityErrors.AuthenticationError());
    }
});

Router.put("/profile", upload.single("profilePicture"), async (req, res, next) => {
    const updatedDetails = {
        displayName: req.body.displayName,
        description: req.body.description,
    };

    if (req.file) {
        try {
            const response = await Cloudinary.streamImageBuffer(req.file.buffer, "test");
            updatedDetails.profilePic = response.url;
        } catch (error) {
            return next(DatabaseErrors.CloudinaryUploadError(error.message));
        }
    }

    req.user.details = {
        ...req.user.details,
        ...updatedDetails,
    };

    await req.user.save();

    return res.status(201).send(req.user.details);
});

module.exports = Router;
