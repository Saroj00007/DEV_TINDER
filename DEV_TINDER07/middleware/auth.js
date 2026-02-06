const User = require("../SRC/models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("INVALID TOKEN !!");
    }

    const DecodedObj = await jwt.verify(token, "S@roj123");
  
    
    if (!DecodedObj) {
      throw new Error("UNABLE TO FIND THE DecodedObj!! ");
    }
    const { _id } = DecodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("UNABLE TO FIND THE USER!! ");
    }

    req.user = user;

    next()
  } catch(error) {
    res.status(400).send("ERROR OCCURED : " + error.message);
  }
};

module.exports = userAuth;
