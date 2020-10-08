const { NODE_ENV } = process.env;

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;
const BASE_URI = `http://${HOST}:${PORT}/`;

const authConfiguration = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SESSION_TOKEN_SECRET: process.env.SESSION_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
};

const databaseConfiguration = {
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DATABASE: NODE_ENV === 'test' ? 'testdb' : process.env.MONGO_DATABASE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

module.exports = {
  PORT,
  HOST,
  BASE_URI,
  NODE_ENV,
  ...authConfiguration,
  ...databaseConfiguration,
};
