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
    SELECT movieId, title, image
    FROM 
      (SELECT users.userId, movies.movieId, title, image
      FROM (userhasmovie JOIN users ON userhasmovie.userId=users.userId) 
      JOIN movies ON userhasmovie.movieId=movies.movieId) AS T
    WHERE userId=?`;

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
