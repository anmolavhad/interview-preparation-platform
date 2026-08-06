import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getLeaderboard } from "../controllers/LeaderboardController.js";

const router = express.Router();

router.get("/:contestId", protect, getLeaderboard);

export default router;