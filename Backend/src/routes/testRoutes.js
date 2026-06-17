import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { startTest } from "../controllers/testController.js";

const router = express.Router();

router.get("/start", protect, startTest);

export default router;