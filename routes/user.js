const connection = require("../startup/connection");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  res.status(200).send("This is the profile");
});

router.get("/movies", auth, async (req, res) => {
  console.log("Header", req.header);
  const query = `   
    SELECT hasmovie.movieId, movies.title, movies.image
    FROM users
    LEFT JOIN hasmovie ON users.id = hasmovie.userId
    LEFT JOIN movies ON hasmovie.movieId = movies.id
    WHERE users.id =?`;

  connection.query(query, [req.user.id], function(error, results, fields) {
    if (error) throw error;
    res.status(200).send(results);
  });
});

router.post("/movies/:id", auth, async (req, res) => {
  console.log(req.user);
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
