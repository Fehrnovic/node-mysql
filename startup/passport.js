const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const connection = require("./connection");

function createToken(user) {
  return jwt.sign(
    { user: _.pick(user, ["id", "email", "name", "created_at"]) },
    config.get("jwtPrivateKey")
  );
}

module.exports = function(passport) {
  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        connection.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          function(err, rows) {
            if (err) return done(err);

            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "Already taken")
              );
            } else {
              const newUser = {
                email,
                name: req.body.name,
                password
              };

              bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                connection.query("INSERT INTO users SET ?", newUser, function(
                  error,
                  results,
                  fields
                ) {
                  if (error) throw error;

                  newUser.id = results.insertId;

                  const token = createToken(newUser);
                  return done(null, newUser, { token });
                });
              });
            }
          }
        );
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        connection.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          function(err, rows) {
            if (err) return done(err);

            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found")
              );
            }

            if (!bcrypt.compareSync(password, rows[0].password)) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Wrong Password")
              );
            }
            const token = createToken(rows[0]);
            return done(null, rows[0], { token });
          }
        );
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = ?", [id], function(
      err,
      rows
    ) {
      if (err) {
        return done(null, err);
      }
      done(null, rows[0]);
    });
  });
};
