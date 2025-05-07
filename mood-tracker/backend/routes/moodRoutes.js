import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { addMoodEntry, deleteMoodEntry, getMoodEntries } from "../controllers/moodsControler.js";

const router = express.Router();

router.get("/", authMiddleware, getMoodEntries);
router.post("/", authMiddleware, addMoodEntry);
router.delete("/:entryId", authMiddleware, deleteMoodEntry);

export default router;
