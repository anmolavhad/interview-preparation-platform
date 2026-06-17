import express from "express";
import { submitTest, getMyAttempts} from "../controllers/testAttemptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitTest);
router.get("/my-attempts", protect, getMyAttempts);

export default router;