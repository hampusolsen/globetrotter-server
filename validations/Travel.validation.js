const { body } = require("express-validator");

module.exports = {
    validateCreateTravel() {
        return [
            body("title").exists().isLength({min: 3}),
            body("description").optional().isLength({max: 400}),
            body(["fromDate", "toDate"]).exists().isISO8601().toDate()
        ];
    },
    validateCreateHappening() {
        return [
            body("title").exists().isString().isLength({min: 3}),
            body("description").optional().isString().isLength({max: 200}),
            body("geoJSON")
                .exists()
                .isString()
                .customSanitizer((geoJSON) => JSON.parse(geoJSON)),
            body("date").exists().toDate().isISO8601(),
            body("toDate").optional().toDate().isISO8601(),
            body("images")
                .optional({ nullable: true, checkFalsy: true })
                .isArray({ min: 1, max: 10 })
                .withMessage("Minimum one file, maximum of 10 files.")
                .custom((_, {req: { files }}) => files.every(image =>
                    ["jpg", "jpeg", "png", "webp"].includes(image.mimetype.split("/")[1])
                ))
                .withMessage("Only jpg/jpeg/png/webp allowed.")
        ];
    }
};
