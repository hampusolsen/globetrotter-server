module.exports = function errorHandler(error, _req, res, _next) {
  console.error(error);

  res.status(error.code).send({
    type: error.name,
    message: error.message,
    status: error.status,
    code: error.code,
  });
};
