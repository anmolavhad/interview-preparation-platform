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
    const answerDetails = [];
    let correctAnswers = 0;

    for (const answer of answers) {
      const question = await Question.findById(
        answer.questionId
      );
      if (!question) {
        continue; // Skip if question not found
      }
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      answerDetails.push({
        questionId: answer.questionId,
        question : question.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        isCorrect,
      });
      if (isCorrect) {
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
      answers: answerDetails,
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

export const getAttemptById = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.status(200).json({ attempt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};