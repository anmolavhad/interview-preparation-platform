import express from "express";
import { submitTest, getMyAttempts, getAttemptById} from "../controllers/testAttemptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitTest);
router.get("/my-attempts", protect, getMyAttempts);
router.get("/:id", protect, getAttemptById);
export default router;