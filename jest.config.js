module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/docs/', '/errors/'],
  verbose: true,
  bail: true,
  collectCoverage: true,
};
