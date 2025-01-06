
import express from "express";
import {
  getUser,
  getAllUsers,
  deleteUser ,
  getTotalUsers, // Import the new controller
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser .js";

const router = express.Router();

// Fetch all users (for admin)
router.get("/allusers", verifyToken, getAllUsers);

// Fetch a single user by ID
router.get("/:id", verifyToken, getUser);

// Fetch total number of users (for admin)
router.get("/total/users", verifyToken, getTotalUsers);

// Delete a user (by the user themselves)
router.delete("/delete/:id", verifyToken, deleteUser );

// Admin: Delete any user
//router.delete("/admin/delete/:id", verifyToken, adminDeleteUser );

export default router;