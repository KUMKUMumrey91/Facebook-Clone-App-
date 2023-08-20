var express = require('express');
var router = express.Router();
var userModel = require("./users")
const passport = require("passport")

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'),{username:req.session.passport.user};
})

router.post('/register', function (req, res) {
  var newUser = new userModel({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    image: req.body.image,
  })
  userModel.register(newUser, req.body.password)
    .then(function (u) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('profile'),{username:req.session.passport.user};
})

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', passport.authenticate('local',
{ successRedirect:'/profile',
faliureRediret:'/login'
}),function(req,res,next){});


router.get('/logout',function(req,res,next){
  req.logout(function(err) {
  if (err) { return next(err); }
  res.redirect('/');
});
});

function isLoggedIn(req,res,next)
{if (req.isAuthenticated()){
  return next();
}else{
  req.redirect('/');
}}

module.exports = router;


