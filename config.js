const dotenv = require("dotenv");
dotenv.config({path: __dirname + '/.env'});
module.exports = {
  testDatabaseUrl: process.env.TEST_DATABASE_URL,
  databaseName: process.env.DATABASE_NAME
};