const mongoose = require('mongoose');
const {
  MONGO_URI,
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_DATABASE,
} = require('./config');
const DatabaseErrors = require('./errors/DatabaseErrors');

module.exports = async function establishDatabaseConnection() {
  try {
    await mongoose.connect(`mongodb://${MONGO_URI}:27017`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      dbName: MONGO_DATABASE,
      user: MONGO_USERNAME,
      pass: MONGO_PASSWORD,
    });
  } catch {
    throw DatabaseErrors.ConnectionError();
  }

  console.log(`Connected to the '${MONGO_DATABASE.toUpperCase()}' database.`);

  mongoose.connection.on('error', (error) => {
    console.error(error);
  });
};
