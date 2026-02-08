const express = require('express');
const User = require("../models/user");
const userAuth = require('../middleware/auth');


const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("THE PROFILE IS : " + user);
  } catch (error) {
    res.status(404).send(error.messageF);
  }
});



module.exports = profileRouter