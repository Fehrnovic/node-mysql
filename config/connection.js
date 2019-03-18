const logger = require("./logging");
const mysql = require("mysql");
const config = require("config");

const dbConfig = config.get("Database.localdbConfig");

const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
  if (err) {
    logger.error();
  }
  logger.info("connected as id " + connection.threadId);
});

module.exports = connection;
