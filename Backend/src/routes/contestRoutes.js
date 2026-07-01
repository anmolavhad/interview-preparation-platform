import express from "express";

import { createContest, getContests, getContestById, updateContest, deleteContest } from "../controllers/contestController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createContest);

router.get("/", protect, getContests);

router.get("/:id", protect, getContestById);

router.put("/:id", protect, adminOnly, updateContest);

router.delete("/:id", protect, adminOnly, deleteContest);

export default router;