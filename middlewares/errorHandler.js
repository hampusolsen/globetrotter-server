module.exports = function errorHandlerFactory(log = true) {
    return function errorHandler(error, _req, res, _next) {
        if (log) console.error(error);

        res.status(error.code).send({
            type: error.name,
            message: error.message,
            status: error.status,
            code: error.code,
        });
    };
};
