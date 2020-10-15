const mongoose = require("mongoose");
const { ConnectionError } = require("../errors");

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const MONGO_DATABASE =
    process.env.NODE_ENV === "test" ? "testdb" : process.env.MONGO_DATABASE;

module.exports = async function establishDatabaseConnection() {
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:27017`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            dbName: MONGO_DATABASE,
            user: MONGO_USERNAME,
            pass: MONGO_PASSWORD,
        });
    } catch {
        throw ConnectionError();
    }

    console.log(`Connected to the '${MONGO_DATABASE.toUpperCase()}' database.`);

    mongoose.connection.on("error", (error) => {
        console.error(error);
    });
};
