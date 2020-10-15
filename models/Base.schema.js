const { Schema } = require("mongoose");

module.exports = function extendBaseSchema(schemaObject) {
    return new Schema(schemaObject, { timestamps: true });
};
