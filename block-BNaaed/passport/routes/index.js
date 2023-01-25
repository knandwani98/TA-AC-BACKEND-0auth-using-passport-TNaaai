var express = require("express");
const passport = require("passport");

var router = express.Router();

// INDEX PAGE
router.get("/", function (req, res, next) {
  console.log(req.session, req.user);
  res.render("index");
});

// PASSPORT LOGIN
router.get("/auth/github", passport.authenticate("github"));

// PASSPORT LOGIN
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/users/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
