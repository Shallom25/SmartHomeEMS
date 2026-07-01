// users.routes.ts
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  registerUser,
  fetchUsers,
  deleteUserData,
  fetchUserById,
  updateUserData,
  signInUser,
  getProfile
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", fetchUsers);
router.get("/profile",authMiddleware, getProfile)
router.post("/register", registerUser);
router.post("/login", signInUser)
router.get("/:id", fetchUserById);
router.delete("/delete/:id", deleteUserData);
router.patch("/update/:id", updateUserData);

export default router;