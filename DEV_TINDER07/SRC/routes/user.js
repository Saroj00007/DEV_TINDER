// here we are going to create the api on the basis of the loggedIn_user

const Express = require("express");
const userAuth = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const { set } = require("mongoose");
const User = require("../models/user");

const userRouter = Express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const LoggedIn_user = req.user;

    const connection_Request = await connectionRequest
      .find({
        toUserid: LoggedIn_user._id,
        status: "intrested",
      })
      .populate("fromUserid", ["Fname", "Lname", "age"]);

    res.json({
      message: "HERE IS THE LIST OF ALL THE INTRESTED REQUEST!",
      connection_Request,
    });
  } catch (error) {
    res.status(400).send("ERROR OCCURED: " + error.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    // we are going to write the api for digging all the connection here in nepal!!

    const LoggedIn_user = req.user;
    console.log("this is for test!");
    console.log(LoggedIn_user._id);
    console.log(LoggedIn_user);

    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { fromUserid: LoggedIn_user._id, status: "accepted" },
          { toUserid: LoggedIn_user._id, status: "accepted" },
        ],
      })
      .populate("fromUserid", ["Fname", "Lname", "age", "gender"])
      .populate("toUserid", ["Fname", "Lname", "age", "gender"]);

    const data = connectionRequests.map((items) => {
      if (items.fromUserid._id.toString() === LoggedIn_user._id.toString()) {
        return items.toUserid;
      }
      return items.fromUserid;
    });

    res.json({
      message: "THE LIST OF CONNECTION THAT YOU HAVE ARE",
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR OCCURED: " + error.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  // this is the feed api

  // now we also had to do the pagenation where we had to limit the number of data we get! for that we will use skip() and limit()  and in querry feed?page=1&count=10

  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 2;


  page = page > 10? 10:page;
  const skip = (page - 1) * count;

  try {
    const LoggedIn_user = req.user;

    const UserConnection = await connectionRequest
      .find({
        $or: [
          { fromUserid: LoggedIn_user._id },
          { toUserid: LoggedIn_user._id },
        ],
      })
      .select("fromUserid toUserid");

    const hideUserFromFeed = new Set(); // this is the concept of DSA whic only stores the original value and in the form of array

    UserConnection.forEach((req) => {
      hideUserFromFeed.add(req.fromUserid.toString());
      hideUserFromFeed.add(req.toUserid.toString());
      console.log("inside");
      console.log(req.fromUserid.toString());
    });

    console.log(hideUserFromFeed);

    const feed_user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: LoggedIn_user._id } },
      ],
    })
      .select("Fname Lname age gender skills")
      .skip(skip)
      .limit(count);

    res.json({ message: "the feed api", feed_user });
  } catch (error) {
    res.status(404).send("ERROR OCCURED: " + error.message);
  }
});

module.exports = userRouter;
