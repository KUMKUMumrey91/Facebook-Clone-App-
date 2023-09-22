const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/facebookAPP");


const userSchema = mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  email: String,
  
  image: {
    type: String,
    default: "def.png"
  },
  posts: [
    {type: mongoose.Schema.Types.ObjectId, 
    ref: "post"}
  ],
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema); 
