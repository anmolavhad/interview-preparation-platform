import express from "express";
import { startContest , submitContest , getContestResult} from "../controllers/contestAttemptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start/:contestId", protect, startContest);
router.put("/:attemptId/submit", protect, submitContest);
router.get("/:attemptId", protect, getContestResult);
export default router;