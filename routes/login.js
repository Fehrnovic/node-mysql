const connection = require("../connection");
const express = require("express");
const router = express.Router();

router.post("/", function(req, res) {
  const loginPost = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    loginPost.username,
    function(error, results, fields) {
      if (results.length > 0) {
        res.status(409).send("Username already exists");
      } else {
        connection.query("INSERT INTO users SET ?", loginPost, function(
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

module.exports = router;
