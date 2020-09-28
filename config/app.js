const baseConfiguration = {
  PORT: process.env.PORT,
};

const developmentConfiguration = {
  ...baseConfiguration,
};

const productionConfiguration = {
  ...baseConfiguration,
};

const configuration =
  process.env.NODE_ENV === 'production'
    ? productionConfiguration
    : developmentConfiguration;

module.exports = configuration;
