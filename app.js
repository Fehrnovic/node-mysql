const express = require("express");
const app = express();

require("./startup/routes")(app);

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Listening on port ${port}...`));
