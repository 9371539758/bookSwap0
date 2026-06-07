const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: [true, "username need unique"],
      index: true, 
    },
    email: {
      
      type: String,
      trim: true,
      unique: [true, "email required unique"],
      required: [true, "email is required"], 
      index: true, 
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false, 
    }
},{timestamps:true});


userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Username or email already exists'));
  } else {
    next(error);
  }
});

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;