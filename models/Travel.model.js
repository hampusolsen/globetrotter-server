const { SchemaTypes, model } = require("mongoose");
const Happening = require("./Happening.model");
const extendBaseSchema = require("./Base.schema");

const TravelSchema = extendBaseSchema({
    travelers: [{ type: SchemaTypes.ObjectId, ref: "User" }],
    title: { type: String, min: 3, max: 40, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    description: { type: String, min: 0, max: 400 },
    happenings: [{ type: SchemaTypes.ObjectId, ref: "Happening" }],
});

TravelSchema.methods.createHappening = async function(data) {
    const happening = await Happening.create(data);

    this.happenings.push(happening._id);
    await this.save();
};

module.exports = model("Travel", TravelSchema);
