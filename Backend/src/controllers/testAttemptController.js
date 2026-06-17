import TestAttempt from "../models/TestAttempt.js";
import Question from "../models/Question.js";


export const submitTest = async (req, res) => {
  try {
    const { testType, subject, answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        message: "No answers submitted",
      });
    }

    let correctAnswers = 0;

    for (const answer of answers) {
      const question = await Question.findById(
        answer.questionId
      );

      if (question && question.correctAnswer === answer.selectedAnswer) {
        correctAnswers++;
      }
    }

    const totalQuestions = answers.length;
    const score = correctAnswers;

    const accuracy = Number(
      (
        (correctAnswers / totalQuestions) *
        100
      ).toFixed(2)
    );

    const attempt = await TestAttempt.create({
      user: req.user.userId,
      testType,
      subject,
      totalQuestions,
      correctAnswers,
      score,
      accuracy,
    });

    res.status(200).json({
      attempt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

export const getMyAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: attempts.length,
      attempts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    }); 
  }
};