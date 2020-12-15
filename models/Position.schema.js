const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PositionSchema;
