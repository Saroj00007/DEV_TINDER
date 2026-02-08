
const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validate = require("../utils/validate");

const authRouter = express.Router();


 authRouter.post("/signup", async (req, res) => {
   //validate the data and all other things
   validate(req);
 
   const { password, Fname, Lname, email, gender, age, skills } = req.body;
   //encrypting the password
 
   console.log(Fname);
 
   const hased_password = await bcrypt.hash(password, 10);
 
   const nayaUser = new User({
     Fname,
     Lname,
     email,
     password: hased_password,
     gender,
     age,
     skills,
   });
 
   console.log(req.body);
 
   try {
     await nayaUser.save();
 
     res.send("user had been updated successfully");
   } catch (error) {
     res.send("error occured during data inserting " + error.message);
   }
 });

 authRouter.post("/login", async (req, res) => {
   try {
     //log_in code lekhna paro aaba yaha
 
     const { emailid, password } = req.body;
     //  console.log(emailid + password);
 
     const user = await User.findOne({ email: emailid });
 
     console.log("email mathi ko hai!");
     console.log(user.email);
     //YAHA EMAIL KO MA CHAI ERROR CHA PAXI MILAYUDA HUNXA
 
     if (!user) {
       console.log("error");
       throw new Error("Unable to find user");
     }
 
     const password_match =  user.isPasswordValid(password);
 
     if (password_match) {
       // firstly we send the cookie to the browser or something say client
 
       // we are generating our own tokens
 
       const token = user.getJWT();
   
       res.cookie("token", token, {
         expires: new Date(Date.now() + 60* 60 * 1000), // 1 day
       });
 
       res.send("loggedIn successfully");
     } else {
       throw new Error("Incorrect password!!");
     }
   } catch (error) {
     res.status(404).send("UNABLE TO LOGIN: " + error.message);
   }
 });
 



module.exports = authRouter