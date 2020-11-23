const { ValidationError } = require("../errors/RequestErrors");
const { validationResult } = require("express-validator");

module.exports = {
    withValidation(controller) {
        return async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ValidationError(errors));

            try {
                await controller(req, res);
            } catch (error) {
                return next(error);
            }
        };
    },
    catch(controller) {
        return async (req, res, next) => {
            try {
                await controller(req, res);
            } catch (error) {
                return next(error);
            }
        };
    },
};
