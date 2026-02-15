const express = require("express");
const User = require("../models/user");
const userAuth = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

// /connectionRequest/send/:status/:user_id

requestRouter.post(
  "/connectionRequest/send/:status/:user_id",
  userAuth,
  async (req, res) => {
    try {
      const { status, user_id } = req.params;
      const fromUser = req.user;

      const toUserid = user_id;
      const fromUserid = fromUser._id;

      const allowed_status = ["intrested", "ignored"];

      if (!allowed_status.includes(status)) {
        throw new Error("INVALID REQUEST SENT");
      }

      const isValid_id = await User.findOne({ _id: toUserid });

      if (!isValid_id) {
        throw new Error("INVALID USER ID!");
      }

      const isUserRepeated = await connectionRequest.findOne({
        $or: [
          { fromUserid, toUserid },
          { fromUserid: toUserid, toUserid: fromUserid },
        ],
      });

      if (isUserRepeated) {
        throw new Error("THE CONNECTIN REQUEST HAD BEEN ALREADY MADE!");
      }

      const connection_request = new connectionRequest({
        fromUserid,
        toUserid,
        status,
      });

      await connection_request.save();

      res.json({
        message: "connection request successfull",
        connection_request,
      });
    } catch (error) {
      res.status(400).send("Error Occured : " + error.message);
    }
  },
);

requestRouter.post(
  "/connectionRequest/review/:status/:request_id",
  userAuth,
  async (req, res) => {
    try {
      const { status, request_id } = req.params;

      const loggedInUser = req.user;

      const allowedStatus = ["accepted", "rejected"];

      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        throw new Error("INVALID REQUST SENT");
      }

      const connection_Request = await connectionRequest.findOne({
        _id : request_id,
        toUserid : loggedInUser._id,
        status : 'intrested'
      });
    
      if(!connection_Request){
        throw new Error('UNABLE TO FIND THE REQUEST!');
      }
     
      connection_Request.status = status;

      const data = await connection_Request.save();

      res.json({
        message: "CONNECTION REQUEST WAS SUCCESSFULLY ACCEPTED!",
        data
      });

    } catch (error) {
      res.status(400).send("ERROR OCCURED : " + error.message);
    }
  },
);

module.exports = requestRouter;
