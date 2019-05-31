const async = require('async');
const connection = require('../startup/connection');
const auth = require('../middleware/auth');
const { getMovie } = require('../services/movieService');

const express = require('express');
const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  res.status(200).send('This is the profile');
});

router.get('/movies', auth, async (req, res) => {
  const query = `
    SELECT imdbID 
    FROM hasmovie
    WHERE hasmovie.userId = ?`;

  connection.query(query, [req.user.id], async (error, results, fields) => {
    if (error) throw error;

    let movies = [];

    for (const result of results) {
      const { data } = await getMovie(result.imdbID);
      movies.push(data);
    }

    res.status(200).send(movies);
  });
});

module.exports = router;
