const express = require("express");
const authRouter = express.Router();
const User = require("../Models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { validateSignupData } = require("../utils/validation");

//  check environment
const isProd = process.env.NODE_ENV === "production";

// ================= SIGNUP =================
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const checkEmail = await User.findOne({ emailId });
    if (checkEmail) {
      throw new Error("Email Already Exist");
    }

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });

    const savedUser = await user.save();
    const token = await savedUser.getjwt();

    // 🔥 COOKIE FIX
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd, // true in production
      sameSite: isProd ? "none" : "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "User added successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ================= LOGIN =================
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getjwt();

    // 🔥 COOKIE FIX
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ================= LOGOUT =================
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    expires: new Date(Date.now()),
  });

  res.send("User Logged out successfully");
});

module.exports = authRouter;
