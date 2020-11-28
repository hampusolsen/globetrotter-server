const { Schema } = require("mongoose");

module.exports = function extendBaseSchema(schemaObject) {
    const schema = new Schema(schemaObject, { timestamps: true });

    schema.virtual("id").get(function() {
        return this._id.toHexString();
    });

    schema.set("toJSON", { virtuals: true });
    schema.set("toObject", { virtuals: true });

    return schema;
};
