const Redis = require("ioredis");

const { REDIS_PORT, REDIS_HOST } = process.env;
const { CachingError } = require("../errors");

const client = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
});

client.on("ready", () => {
    console.log("Connected to the cache database.");
});

client.on("error", (error) => {
    console.error(CachingError(error.message));
});

module.exports = client;
