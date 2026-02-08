const express = require('express')
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.Fname + " IS SENDING THE CONNECTION REQUEST");
  } catch (error) {
    res.status(400).send("Error Occured : " + error.message);
  }
});


module.exports = requestRouter;