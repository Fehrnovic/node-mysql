const logger = require("./startup/logging");
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.PORT || 5000;
app.listen(5000, () => logger.info(`Listening on port ${port}...`));
