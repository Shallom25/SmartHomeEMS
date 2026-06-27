// users.routes.ts
import express from "express";
import {
  registerUser,
  fetchUsers,
  deleteUserData,
  fetchUserById,
  updateUserData,
  signInUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", fetchUsers);
router.get("/:id", fetchUserById);
router.post("/register", registerUser);
router.post("/login", signInUser)
router.delete("/delete/:id", deleteUserData);
router.patch("update/:id", updateUserData);

export default router;