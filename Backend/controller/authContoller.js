import bcrypt from "bcrypt";
import User from "../models/userModel.js";

import jwt from "jsonwebtoken";
// not working these route
//always given axios error saying that failed to sign up
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send({
      message: "Registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({
      message: "Failed to sign up",
      success: false,
    });
  }
};
export const signin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(401).send({
        message: "invalid User",
      });
    }
    const validpassword = bcrypt.compareSync(password, validUser.password);
    if (!validpassword) {
      return res.status(401).send({
        message: "invalid credentials",
      });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
  }
};
export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "User has been logged out",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
