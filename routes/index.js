var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) res.redirect('/dashboard');
  res.render('index', { user: req.user});
});

router.get('/register', function(req, res, next) {
  if (req.isAuthenticated()) res.redirect('/dashboard');
  res.render('register', {regErr: req.regErr});
});

router.post('/register', function(req, res) {
    User.register(new User({
      username : req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/dashboard');
        });
    });
});

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) res.redirect('/dashboard');
  res.render('login', { user: req.user, loginErr: req.session.loginErr });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.session.loginErr = "Invalid Username or Password";
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
