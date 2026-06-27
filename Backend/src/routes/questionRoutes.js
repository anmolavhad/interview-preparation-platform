import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createQuestion);
router.get("/", protect,getQuestions);
router.get("/:id", protect,getQuestionById);
router.put("/:id", protect, adminOnly, updateQuestion);
router.delete("/:id", protect, adminOnly, deleteQuestion);
export default router;