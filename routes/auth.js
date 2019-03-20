const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', function(err, user, info) {
    if (!user) {
      res.status(400).send({ message: 'Wrong credentials' });
    } else {
      res
        .status(200)
        .header('x-auth-token', info.token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({
          message: 'Successfully logged in',
          username: user.username
        });
    }
  })(req, res, next);
});

router.post('/register', (req, res, next) => {
  passport.authenticate('local-register', { session: false }, function(
    err,
    user,
    info
  ) {
    if (!user) {
      res.status(409).send({ message: 'Email is already registered' });
    } else {
      res
        .status(200)
        .header('x-auth-token', info.token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({
          message: 'Successfully registered',
          username: user.username
        });
    }
  })(req, res, next);
});

module.exports = router;
