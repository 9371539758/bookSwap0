const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: [true, "username must be unique"],
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, "full name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email must be unique"],
      required: [true, "email is required"],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Username or email already exists"));
  } else {
    next(error);
  }
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
