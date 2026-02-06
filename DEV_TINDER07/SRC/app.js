const express = require("express");
const { newbe_auth, admin_auth } = require("../middleware/auth");
const connectdb = require("../config/connectdb");

const validate = require("../SRC/utils/validate");
const bcrypt = require("bcrypt");

const cookiesparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("../SRC/models/user");
const userAuth = require("../middleware/auth");

const app = express();

app.use(express.json());
app.use(cookiesparser());

app.get("/", (req, res) => {
  res.send("hey this is the get request ");
});

app.post("/signup", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("THE PROFILE IS : " + user);
  } catch (error) {
    res.status(404).send(error.messageF);
  }
});

app.post("/login", async (req, res) => {
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

    const password_match = await bcrypt.compare(password, user.password);

    if (password_match) {
      // firstly we send the cookie to the browser or something say client

      // we are generating our own tokens

      const token = jwt.sign({ _id: user._id }, "S@roj123", {
        expiresIn: "1m",
      });
      console.log(token);
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

app.post("/connectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.Fname + " IS SENDING THE CONNECTION REQUEST");
  } catch (error) {
    res.status(400).send("Error Occured : " + error.message);
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
