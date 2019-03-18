const winston = require("winston");
const connection = require("../startup/connection");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  connection.query("SELECT * FROM movies", function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.get("/:id", async (req, res) => {
  connection.query(
    "SELECT * FROM movies WHERE movieId=?",
    [req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.status(200).send(results);
    }
  );
});

router.post("/:id", auth, async (req, res) => {
  const post = { userId: req.user.id, movieId: req.params.id };
  connection.query("INSERT INTO hasmovie SET ?", post, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.status(200).send(results);
  });
});
module.exports = router;
