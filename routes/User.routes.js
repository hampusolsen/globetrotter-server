const Router = require("express").Router();
const { DatabaseErrors, SecurityErrors } = require("../errors");
const Cloudinary = require("../libs/Cloudinary");
const Multer = require("../middlewares/multer");

Router.get("/profile/:userId?", (req, res, next) => {
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

Router.put("/profile", Multer.single("profilePicture"), async (req, res, next) => {
    let updatedDetails = {
        display_name: req.body.displayName,
        description: req.body.description,
    };

    console.log(req.file);

    if (req.file) {
        try {
            const response = await Cloudinary.streamImageBuffer(req.file.buffer, "test");
            updatedDetails.profile_pic = response.url;
        } catch (error) {
            return next(DatabaseErrors.CloudinaryUploadError(error.message));
        }
    }

    // req.user.details.display_name = req.body.displayName;
    req.user.details = {
        ...req.user.details,
        ...updatedDetails,
    };

    await req.user.save();

    return res.status(201).send(req.user.details);
});

module.exports = Router;
