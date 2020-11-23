const { SchemaTypes, model } = require("mongoose");
const PositionSchema = require("./Position.schema");
const extendBaseSchema = require("./Base.schema");

const HappeningSchema = extendBaseSchema({
    travel: { type: SchemaTypes.ObjectId, required: true },
    title: { type: String, min: 3, max: 40, required: true },
    description: { type: String, max: 200 },
    images: [String],
    date: { type: Date, required: true },
    toDate: Date,
    position: {
        type: PositionSchema,
        required: true,
    }
});

module.exports = model("happening", HappeningSchema);
