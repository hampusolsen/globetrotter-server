require('dotenv').config();

const { PORT } = require('./config');
const app = require('./app');
const establishDatabaseConnection = require('./db');

(async () => {
  await establishDatabaseConnection();

  app.listen(PORT, () => console.log(`API server running on port ${PORT}.`));
})();
