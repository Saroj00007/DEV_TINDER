const mongoose = require("mongoose");
const validator = require("validator");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
    index:true ,
    // value vaneko chai user le input garna khojeko wala video   
    validate(value){
    console.log(value)
      const isVALIDATE = validator.isEmail(value)
      if(!isVALIDATE){
          throw new Error(`Email is unsatisfied : ${value}`)
      }
    }
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


userSchema.methods.getJWT =  function(){
    const user = this;

    const token = jwt.sign({ _id: user._id }, "S@roj123", {
            expiresIn: "10m",
          });

    return token;
};

userSchema.methods.isPasswordValid = async function(Password_inputBy_user){
    const user = this;

    const password_match = await bcrypt.compare(Password_inputBy_user, user.password);
    console.log(password_match)

    return password_match;
}

// now creating the model for the api so that we can move forward

const User = mongoose.model("User", userSchema);
module.exports = User;
