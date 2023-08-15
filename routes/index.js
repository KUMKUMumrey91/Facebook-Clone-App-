var express = require('express');
var router = express.Router();
var userModel = require("./users")
const passport = require("passport")

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
})


router.post('/register', function(req,res){
  var newUser = new userModel ({
    username: req.body.username,
    age:req.body.age,
    email:req.body.email,

  })
  userModel.register(newUser, req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,fuction())
    res.redirect('/profile')
  })
}) 
.catch(function(e){
  res.sender(e)
})

router.get('/profile', function(req, res, next) {
  res.render('profile');
})


router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login',isLoggedIn, passport.authenticate('local',
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


