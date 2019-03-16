const connection = require("../connection");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  connection.query("SELECT * FROM users", function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.get("/movies/:userid", async (req, res) => {
  const query = `
    SELECT *
    FROM users
    LEFT JOIN userhasmovie ON users.userId = userhasmovie.userId
    LEFT JOIN movies ON userhasmovie.movieId = movies.movieId
    WHERE users.userId =?`;

  connection.query(query, [req.params.userid], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.status(200).send(results);
  });
});
module.exports = router;
