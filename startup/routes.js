const express = require("express");
const movies = require("../routes/movies");
const user = require("../routes/user");
const auth = require("../routes/auth");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const session = require("express-session");

require("../config/passport")(passport);

module.exports = function(app) {
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

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use("/api/movies", movies);
  app.use("/api/user", user);
  app.use("/api/auth", auth);
};
