const winston = require('winston');
const connection = require('../startup/connection');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  connection.query('SELECT * FROM movies', function(error, results, fields) {
    res.status(200).send(results);
  });
});

router.get('/:id', async (req, res) => {
  connection.query('SELECT * FROM movies WHERE id=?', [req.params.id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.status(200).send(results[0]);
  });
});

router.post('/:id', auth, async (req, res) => {
  console.log(req.user);
  const post = { userId: req.user.id, movieId: req.params.id };

  connection.query(
    'SELECT * FROM hasmovie WHERE userId=? AND movieId=?',
    [post.userId, post.movieId],
    function(error, results, fields) {
      if (results.length) return res.status(400).send('already added');

      connection.query('INSERT INTO hasmovie SET ?', post, function(
        error,
        results,
        fields
      ) {
        console.log('inserting');
        if (error) throw error;
        res.status(200).send(results);
      });
    }
  );
});

module.exports = router;
