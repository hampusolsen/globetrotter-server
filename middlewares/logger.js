module.exports = function logger(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();

    console.log(
      `${req.method} ${req.path} ${res.statusCode} ${endTime - startTime}ms`
    );
  });

  next();
};
