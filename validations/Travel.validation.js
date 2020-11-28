const { body, check } = require("express-validator");

module.exports = {
    validateCreateTravel() {
        return [
            body("title").exists().isLength({min: 3}),
            body("description").optional().isLength({max: 400}),
            body(["fromDate", "toDate"]).exists().isISO8601().toDate(),
            // body("travelers").exists().isArray()
        ];
    },
    validateCreateHappening() {
        return [
            body("title").exists().isString().isLength({min: 3}),
            body("description").optional().isString().isLength({max: 200}),
            body(["lat", "lng"]).exists().isFloat(),
            body("date").exists().isDate(),
            body("toDate").optional().isDate(),
            check("images")
                .custom((_, {req}) => {
                    console.log(req.files);
                    return false;
                })
                .withMessage("Only jpg/jpeg/png/webp allowed.")
        ];
    }
};
