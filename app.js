var connection = require("./connection.js");
const movies = require("./routes/movies");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/movies", movies);

app.get("/", (req, res) => {
  res.write("Hello");
  res.end();
});

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Listening on port ${port}...`));
