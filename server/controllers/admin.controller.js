import Admin from "../models/admin.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return next(errorHandler(400, "Username and password are required"));
  }

  // Validate password length
  if (password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters long"));
  }

  // Check for duplicate username
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return next(errorHandler(400, "Username already exists"));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};

// Signin Controller
export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return next(errorHandler(500, "JWT secret is not defined"));
    }

    // Find admin by username
    const validAdmin = await Admin.findOne({ username });
    if (!validAdmin) {
      return next(errorHandler(404, "Admin not found"));
    }

    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    // Generate JWT token with expiry
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Remove password from the response
    const { password: pass, ...rest } = validAdmin._doc;

    // Set token in cookie and send response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Error during signin:", error);
    next(error);
  }
};

// Signout Controller
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Admin signed out successfully" });
  } catch (error) {
    console.error("Error during signout:", error);
    next(error);
  }
};