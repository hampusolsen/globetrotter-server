const redis = require('redis');
const { REDIS_PORT, REDIS_HOST } = require('.');
const { CachingError } = require('../errors/DatabaseErrors');

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

client.get('FOO', (err, reply) => {
  console.log(reply);
});

client.on('error', (error) => {
  console.error(CachingError(error.message));
});

module.exports = client;
