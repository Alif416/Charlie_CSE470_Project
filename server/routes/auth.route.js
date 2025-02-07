import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password, address, age, profession, mobileNumber } = req.body;

  // Validate required fields
  if (!username || !email || !password || !address || !age || !profession || !mobileNumber) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser  = new User({
    username,
    email,
    password: hashedPassword,
    address,
    age,
    profession,
    mobileNumber,
  });

  try {
    await newUser .save();
    res.status(201).json({ message: "User  created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};

// Signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser  = await User.findOne({ email });
    if (!validUser ) return next(errorHandler(404, "User  Not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser .password);
    if (!validPassword)
      return next(errorHandler(404, "Invalid User Credentials!"));

    const token = process.env.JWT_SECRET;
    const { password: pass, ...rest } = validUser ._doc;
    res
      .cookie("access_token", token, { httpOnly: false })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google OAuth Controller
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser  = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        address: "Not provided", // Default value for Google OAuth users
        age: 0, // Default value for Google OAuth users
        profession: "Not provided", // Default value for Google OAuth users
        mobileNumber: "Not provided", // Default value for Google OAuth users
      });

      await newUser .save();
      const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser ._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// Signout Controller
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User  signed out successfully" });
  } catch (error) {
    next(error);
  }
};