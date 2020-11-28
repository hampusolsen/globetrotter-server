const Router = require("express").Router();
const Travel = require("../models/Travel.model");
const TravelValidation = require("../validations/Travel.validation");
const { withValidation } = require("../libs/controller");
const upload = require("../middlewares/upload");

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
        console.log(req.body);
        return res.send("OK");
    })
);

module.exports = Router;
