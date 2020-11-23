const { body } = require("express-validator");

module.exports = {
    validateUserCredentials() {
        return [
            body("email", "Email required.")
                .exists()
                .isEmail(),
            body("password", "Password required.")
                .exists()
                .isLength({ min: 8 }),
        ];
    }
};
