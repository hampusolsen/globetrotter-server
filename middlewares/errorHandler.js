module.exports = function errorHandlerFactory(log = true) {
    return function errorHandler(error, _req, res, _next) {
        console.log(error);
        if (log && error.code === 500) console.error(error);

        if (error.errors) {
            res.status(error.code).send({
                errors: error.errors.errors,
                type: error.name,
                message: error.message,
                status: error.status,
                code: error.code,
            });
        } else {
            res.status(error.code).send({
                type: error.name,
                message: error.message,
                status: error.status,
                code: error.code,
            });
        }
    };
};
