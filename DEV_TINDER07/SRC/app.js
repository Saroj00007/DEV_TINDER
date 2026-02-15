const express = require("express");

const connectdb = require("../config/connectdb");

const validate = require("../SRC/utils/validate");
// const bcrypt = require("bcrypt");

const cookiesparser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

const User = require("../SRC/models/user");
// const userAuth = require("./middleware/auth");

const userAuth = require('../SRC/middleware/auth');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requrestRouter = require('./routes/request');
const userRouter = require("./routes/user");

const cors = require('cors')

const app = express();

app.use(cors({
  origin: "http://localhost:5173/",
  credentials : true
}))

app.use(express.json());
app.use(cookiesparser());


// now implementing the routes

app.use('/' , authRouter);
app.use('/' , profileRouter);
app.use('/' , requrestRouter);
app.use('/' , userRouter);



app.get("/", (req, res) => {
  res.send("hey this is the get request ");
});

app.get("/user", async (req, res) => {
  const req_user = req.body.Fname;

  try {
    const usergained = await User.find({ Fname: req_user });

    if (usergained.length === 0) {
      res.send("user not found");
    } else {
      console.log("hello from /user");
      // console.log(usergained)

      res.send(usergained);
    }
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    user_gained = await User.find({}); //db ko sabai kam haru async await ma garne
    if (user_gained.length != 0) {
      console.log("hello from the feed center");
      res.send(user_gained);
    } else {
      res.status(404).send("USER NOT FOUND!!");
    }
  } catch (error) {
    res.status(404).send("SOMETHING WENT WRONG");
  }
});

// we are now gonna delete the information

app.get("/delete", async (req, res) => {
  const userid_gained = req.body.userid;

  try {
    await User.findByIdAndDelete(userid_gained);
    res.send("user had been deleted successfully");
  } catch (error) {
    res.status(404).send("something went wrong!!");
  }
});

app.put("/update", async (req, res) => {
  const data = req.body;
  const user_id = req.body.user_id;
  console.log(user_id);

  try {
    const UPDATE_ALLOWED = [
      "user_id",
      "Fname",
      "Lname",
      "age",
      "password",
      "photo_url",
      "skills",
    ];

    const IS_ALLOWED = Object.keys(data).every((k) => {
      return UPDATE_ALLOWED.includes(k);
    });

    if (!IS_ALLOWED) {
      throw new Error(" USER UPDATE DENIED");
    }

    if (data?.skills.length > 3) {
      throw new Error("MAXIMUM LENGTH CROSSED!");
    }
  } catch (err) {
    res.status(404).send("unable to update user " + err.message);
  }

  try {
    const manche = await User.findByIdAndUpdate(user_id, data, {
      returnDocument: "after",
    });
    console.log("user updated successfully!!");
    res.send(manche);
  } catch (error) {
    res.status(404).send("SOMETHING WENT WRONG!!!");
  }
});



connectdb()
  .then(() => {
    console.log("helo the db is connected");

    app.listen(3000, () => {
      console.log("this is to confirm that server is waiting in 3000 port");
    });
  })
  .catch((err) => {
    console.log("hey there is some error" + err.message);
  });
