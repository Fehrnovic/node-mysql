const axios = require('axios');

function getMovie(imdbID) {
  return axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=30d13521`);
}

module.exports.getMovie = getMovie;
