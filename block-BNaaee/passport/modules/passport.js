var passport = require("passport");
var User = require("../models/User");
var GitHubStrategy = require("passport-github").Strategy;
var GoogleStrtegy = require("passport-google-oauth20").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      var userInfo = {
        name: profile.displayName,
        email: profile._json.email,
        username: profile.username,
        avatar_url: profile._json.avatar_url,
      };

      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userInfo, (err, addedUser) => {
            if (err) return done(err);
            done(null, addedUser);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.use(
  new GoogleStrtegy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      var userInfo = {
        name: profile._json.name,
        email: profile._json.email,
        username: profile._json.username,
        avatar_url: profile._json.picture,
      };

      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userInfo, (err, addedUser) => {
            if (err) return done(err);
            done(null, addedUser);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
