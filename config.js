const { NODE_ENV } = process.env;

const serverConfiguration = {
  PORT: process.env.PORT,
};

const authConfiguration = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
};

const databaseConfiguration = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DATABASE: NODE_ENV === 'test' ? 'testdb' : process.env.MONGO_DATABASE,
  REDIS_URI: process.env.REDIS_URI,
};

module.exports = {
  NODE_ENV,
  ...serverConfiguration,
  ...authConfiguration,
  ...databaseConfiguration,
};
