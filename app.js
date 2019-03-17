const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Listening on port ${port}...`));
