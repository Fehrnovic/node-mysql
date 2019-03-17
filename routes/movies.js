const connection = require("../config/connection");
const auth = require("../middleware/auth");
const logger = require("../startup/logging");

const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  logger.info("Getting all movies");
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

module.exports = router;
