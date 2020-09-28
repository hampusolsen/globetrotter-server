require('dotenv').config();

const server = require('express')();
const loadConfiguration = require('./config');
const { AuthenticationError } = require('./errors');

const { PORT } = loadConfiguration();

server.use('*', async (_req, _res, next) => {
  try {
    throw AuthenticationError();
  } catch (err) {
    next(err);
  }
});

server.use((error, _req, res, _next) => {
  res.status(error.code).send({
    type: error.name,
    message: error.message,
    status: error.status,
    code: error.code,
  });
});

server.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
