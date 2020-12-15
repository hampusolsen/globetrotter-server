const Router = require("express").Router();
const Travel = require("../models/Travel.model");
const TravelValidation = require("../validations/Travel.validation");
const { withValidation, withErrorBoundary } = require("../libs/controller");
const upload = require("../middlewares/upload");
const { DatabaseErrors } = require("../errors");
const Cloudinary = require("../libs/cloudinary");
const Happening = require("../models/Happening.model");

Router.get(
    "/",
    withErrorBoundary(async (req, res) => {
        const travels = await Travel
            .find({})
            .populate("happenings")
            .populate("travelers", "details");

        return res.send(travels);
    })
);

Router.post(
    "/",
    TravelValidation.validateCreateTravel(),
    withValidation(async (req, res) => {
        const travel = new Travel(req.body);

        travel.travelers.push(req.user._id);
        await travel.save();

        req.user.travels.push(travel._id);
        await req.user.save();

        return res.status(201).send(travel);
    })
);

Router.post(
    "/:travelId",
    upload.many("images"),
    TravelValidation.validateCreateHappening(),
    withValidation(async (req, res) => {
        const happening = new Happening({
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            position: { coordinates: req.body.geoJSON },
            travelId: req.params.travelId
        });

        const travel = await Travel.findById(req.params.travelId);
        travel.happenings.push(happening._id);
        await travel.save();

        if (req.files.length) {
            const responses = await Promise.all(req.files.map(
                ({ buffer }) => Cloudinary.streamImageBuffer(buffer, happening._id)
            ));

            responses.forEach(res => happening.images.push(res.url));
        }

        await happening.save();

        return res.status(201).send(happening);
    })
);

Router.get(
    "/:travelId",
    withErrorBoundary(async (req, res) => {
        const travel = await Travel.findById(req.params.travelId);
        if (!travel) throw DatabaseErrors.EntityNotFoundError();

        res.send(travel);
    })
);

module.exports = Router;
