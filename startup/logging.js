require("express-async-errors");
const { createLogger, transports } = require("winston");

// Enable exception handling when you create your logger.
module.exports = createLogger({
  level: "error",
  transports: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: "combined.log" })
  ],
  exceptionHandlers: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: "exceptions.log" })
  ]
});
