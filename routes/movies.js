const connection = require("../connection");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  connection.query("SELECT * FROM movies", function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.get("/:id", async (req, res) => {
  connection.query("SELECT * FROM movies WHERE ID=?", [req.params.id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.status(200).send(results);
  });
});

router.get("/test/:userid", async (req, res) => {
  const query = `
    SELECT * 
    FROM 
      (SELECT userId, title, image
       FROM (hasmovie JOIN accounts ON hasMovie.userId=accounts.id) 
       JOIN movies ON hasMovie.movieId=movies.id) AS T
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
