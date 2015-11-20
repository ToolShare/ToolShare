var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Tool = require('../models/Tool')

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
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      }
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

router.get('/requesttool/:tool', function(req,res, next){
  if(!req.isAuthenticated()) res.redirect('/login')
  Tool.find({name:req.params.tool, isAvailable: true})
  .populate('_user')
  .exec(function(err, tools){
    if (req.user) {
      var filteredTools = tools.filter(function(tool){
        if (req.user) return (tool.userId !== req.user.id)
      })
      tools = filteredTools
    }

    res.render('requesttool',{tools:tools, user:req.user})
  })
});

router.get('/tools/add', function(req, res, next) {
  var category = req.query.category ? req.query.category :'power';
  var user = req.user ? req.user : false;
  res.render('addtool', {
      category: category,
      lists: require('../helpers/toolsList'),
      user: user,
    })
});

module.exports = router;
