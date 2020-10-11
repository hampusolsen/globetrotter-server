module.exports = function loggerFactory(level) {
  return function logger(req, res, next) {
    const startTime = Date.now();

    res.on('finish', () => {
      const time = Date.now() - startTime;

      switch (level) {
        case 'verbose':
          break;
        default:
          console.log(`${req.method} ${req.path} ${res.statusCode} ${time}ms`);
      }
    });

    next();
  };
};
