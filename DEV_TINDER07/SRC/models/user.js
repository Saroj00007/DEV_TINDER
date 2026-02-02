const mongoose = require("mongoose");

// inputing the restrecting into the database schema
const userSchema = mongoose.Schema({
  Fname: {
    type: String,
    required: true,
    maxlength: 40,
  },
  Lname: {
    type: String,
    required: true,
    maxlength: 40,
  },
  age: {
    type: Number,
    min: 12,
    required : true
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("invalid gender");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
    default : "www.saroj_photo.png"
  },
  skills :{
    type : [String]
  }
} , {
  timestamps:true
});

// now creating the model for the api so that we can move forward

const User = mongoose.model("User", userSchema);
module.exports = User;
