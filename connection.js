const mysql = require("mysql");
const config = require("config");

const dbConfig = config.get("Database.localdbConfig");

const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
