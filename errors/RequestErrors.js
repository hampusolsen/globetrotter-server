const BaseError = require("./BaseError");

class ValidationError extends BaseError {
    constructor(errors, message = "Failed to validate request body.", code = 422) {
        super(message, code);
        this.name = this.constructor.name;
        this.errors = errors;
    }
}

module.exports = {
    ValidationError(errors) {
        return new ValidationError(errors);
    },
};
