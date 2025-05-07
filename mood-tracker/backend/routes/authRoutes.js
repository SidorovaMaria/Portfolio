import express from "express";
import { getUser, login, setProfile, signup } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getUser);
router.put("/profile", authMiddleware, upload.single("profileImg"), setProfile);

export default router;
