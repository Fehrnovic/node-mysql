const connection = require("../connection");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  connection.query("SELECT * FROM movies", function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.post("/login", function(req, res) {
  const loginPost = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  connection.query(
    "SELECT * FROM accounts WHERE username = ?",
    loginPost.username,
    function(error, results, fields) {
      if (results.length > 0) {
        res.status(409).send("Username already exists");
      } else {
        connection.query("INSERT INTO accounts SET ?", loginPost, function(
          error,
          results,
          fields
        ) {
          if (error) throw error;

          res.status(200).send(results);
        });
      }
    }
  );
});

router.post("/", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.send("Logged in");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

module.exports = router;
