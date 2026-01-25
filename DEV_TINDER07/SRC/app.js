const express = require("express");
const { newbe_auth, admin_auth } = require("../middleware/auth");

const app = express();

// ani aarko error handling ko kura always better to use try catch / otherwise you can also use err argument at last

// request handler !!!
app.get("/newbe", newbe_auth);

app.use("/admin", admin_auth);

app.use("/admin", (req, res, next) => {
  // res.send("hello from the admin pannel")

  try {
    console.log("hello from 2nd request handler!!!!");

    throw new Error("this is the new error");

    res.send("this is the admin page only admin can ascess it");
  } catch (error) {

    res.send("Error has been resolved in try_catch block")
  }
});

app.get("/newbe", (req, res, next) => {
  console.log("hello from 1s handler");
  res.send("hello this is newbe page");
});

app.get("/user/:userid/:name/:age", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({ name: "saroj", age: 20 });
});
app.get("/*fly $/", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({ name: "saroj", age: 20 });
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(401).send("error had been occured");
  }
});

app.listen(3000, () => {
  console.log("this is to confirm that server is waiting in 3000 port");
});
