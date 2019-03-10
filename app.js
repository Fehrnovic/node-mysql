const connection = require("./connection.js");
const session = require("express-session");
const bodyParser = require("body-parser");
const movies = require("./routes/movies");
const auth = require("./routes/auth");

const express = require("express");
const app = express();

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true
  })
);
app.use("/api/movies", movies);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.write("Hello");
  res.end();
});

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Listening on port ${port}...`));
