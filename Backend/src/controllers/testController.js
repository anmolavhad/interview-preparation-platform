import Question from "../models/Question.js";

export const startTest = async (req, res) => {
  try {
    const { type, subject } = req.query;
    let questions;

    if (type === "subject") {
      questions = await Question.aggregate([{ $match: { subject } }, { $sample: { size: 10 } }]);
    } else if (type === "mock") {
      questions = await Question.aggregate([{ $sample: { size: 20 } }]);
    } else {
      return res.status(400).json({ message: "Invalid test type" });
    }

    questions = questions.map(({ correctAnswer, explanation, ...question }) => question);

    res.status(200).json({ count: questions.length, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  