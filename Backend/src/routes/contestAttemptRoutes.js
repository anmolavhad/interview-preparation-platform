import express from "express";
import { startContest } from "../controllers/contestAttemptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start/:contestId", protect, startContest);

export default router;