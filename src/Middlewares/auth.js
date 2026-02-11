const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login or Signup");
    }

    const deocodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = deocodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
