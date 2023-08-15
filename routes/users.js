const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/hello");


const userSchema = mongoose.Schema({
  username: req.body.username,
  password: req.body.password,
  age: req.body.age,
  email: req.body.email,
 
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema); 
