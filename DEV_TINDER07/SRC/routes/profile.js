const express = require('express');
const User = require("../models/user");
const userAuth = require('../middleware/auth');
const {validateProfileEdit} = require('../utils/validate');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("THE PROFILE IS : " + user);
  } catch (error) {
    res.status(404).send(error.messageF);
  }
});


profileRouter.patch('/profile/edit' , userAuth ,  async(req , res)=>{
  try {
     const user_data = req.body;

    if(!user_data){
      throw new Error("NO FILE IS SENT TOT EDIT!")
    }
  
  if(!validateProfileEdit){
    throw new Error("UNABLE TO EDIT THE DATA!!")
  }
 
  const {token} = req.cookies;
  
  // console.log("token : "+ token)

  const decoded_obj  = await jwt.verify(token , "S@roj123")

  // console.log(decoded_obj)

  const {_id} = decoded_obj;
  
 console.log("id  "+_id)

  const updated_data = await User.findOneAndUpdate({_id} , req.body, { returnDocument: "after"} );


  res.send("YOUR DATA IS SUCESSFULLY UPDATEED!! : " + updated_data);
 
  } catch (error) {
    res.status(400).send("Error occured : "+ error.message)
  }

})

profileRouter.patch('/profile/forgotpassword' ,userAuth ,  async (req , res)=>{
 try {
   const {old_password , new_password} = req.body;
    const hashed_pass = req.user.password;

    if(old_password == new_password){
      throw new Error("YOU HAD ENTERED THE SAME PASSWORD FOR NEW AND OLD PASSWORD")
    }

   const isMatched = await bcrypt.compare(old_password , hashed_pass );
  // isMatched = true

  if(!isMatched){
    throw new Error("YOR OLD PASSWORD DOESNOT MATCHED")
  }

  const newhashed_pass = await bcrypt.hash(new_password , 10);

  
  await User.findOneAndUpdate({password : hashed_pass} , {password:newhashed_pass}  );

  res.send("YOUR NEW PASS HAS BEEN SAVED AS : "+ new_password)

 } catch (error) {
  res.status(400).send("ERROR OCCURED: " + error.message)
 }

})



module.exports = profileRouter