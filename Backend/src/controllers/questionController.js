import Question from "../models/Question.js";

export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json({
      question
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Example URL => GET /api/questions?page=3&subject=DBMS&difficulty=Easy
export const getQuestions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10

    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.subject) {
      filter.subject = req.query.subject;
    }

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    const questions = await Question.find(filter)
      .skip(skip)
      .limit(limit);

    const totalQuestions = await Question.countDocuments(
      filter
    );

    res.status(200).json({
      page,
      totalPages: Math.ceil(
        totalQuestions / limit
      ),
      totalQuestions,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 
export const getQuestionById = async (req, res) => {
  try {
    const question =
      await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json({
      question,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({question });
  } catch (error) {
    res.status(500).json({message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};