const { body } = require("express-validator");

module.exports = {
    validateUserCredentials() {
        return [
            body("email", "Email must exist.")
                .exists()
                .isEmail(),
            body("password", "Password must exist.")
                .exists()
                .isLength({ min: 8 }),
        ];
    }
};
