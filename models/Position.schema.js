const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    type: {
        type: String,
        enum: ["Position"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = PositionSchema;
