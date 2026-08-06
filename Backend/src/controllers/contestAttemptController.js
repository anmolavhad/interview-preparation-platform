import Contest from "../models/Contest.js";
import ContestAttempt from "../models/ContestAttempt.js";

export const startContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId)
      .populate("questions");

    if (!contest) {
      return res.status(404).json({
        message: "Contest not found",
      });
    }
    
    const now = new Date();

    if (now < contest.startTime) {
      return res.status(400).json({
        message: "Contest has not started yet.",
      });
    }

    const endTime = new Date(
      contest.startTime.getTime() + contest.duration * 60000
    );

    if (now > endTime) {
      return res.status(400).json({
        message: "Contest has already ended.",
      });
    }

    let attempt = await ContestAttempt.findOne({
      contest: contest._id,
      user: req.user.userId,
    });

    if (!attempt) {
      attempt = await ContestAttempt.create({
        contest: contest._id,
        user: req.user.userId,
        startTime: now,
        answers: [],
      });
    }
    //To check if user has already submitted the contest
    if (attempt.isSubmitted) {
      return res.status(400).json({
        message: "You have already submitted this contest.",
      });
    }
    res.status(200).json({
      attemptId: attempt._id,
      contest: {
        _id: contest._id,
        title: contest.title,
        duration: contest.duration,
        questions: contest.questions,
        startTime: contest.startTime,
        attemptStartTime: attempt.startTime,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};    

export const submitContest = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answers, timeTaken } = req.body;

    const attempt = await ContestAttempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        message: "Contest attempt not found",
      });
    }

    if (attempt.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (attempt.isSubmitted) {
      return res.status(400).json({
        message: "Contest already submitted",
      });
    }

    const contest = await Contest.findById(attempt.contest)
      .populate("questions");

    if (!contest) {
      return res.status(404).json({
        message: "Contest not found",
      });
    }

    const questionMap = new Map();

    contest.questions.forEach((question) => {
      questionMap.set(question._id.toString(), question);
    });

    let score = 0;

    const evaluatedAnswers = [];

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);

      if (!question) {
        continue;
      }

      const isCorrect =
        question.correctAnswer === answer.selectedAnswer;

      if (isCorrect) {
        score++;
      }

      evaluatedAnswers.push({
        questionId: question._id,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      });
    }

    attempt.answers = evaluatedAnswers;
    attempt.score = score;
    attempt.totalQuestions = contest.questions.length;
    attempt.timeTaken = timeTaken;
    attempt.isSubmitted = true;
    attempt.submittedAt = new Date();

    await attempt.save();

    res.status(200).json({
      message: "Contest submitted successfully",
      result: {
        score,
        totalQuestions: contest.questions.length,
        timeTaken,
        attemptId: attempt._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};        


export const getContestResult = async (req, res) => {
  try {
    const attempt = await ContestAttempt.findById(req.params.attemptId)
      .populate("contest", "title");

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    if (attempt.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const accuracy =
      attempt.totalQuestions === 0
        ? 0
        : Number(
            (
              attempt.score /
              attempt.totalQuestions
            ) * 100
          ).toFixed(2);

    const correctAnswers = attempt.score;

    const wrongAnswers =
      attempt.totalQuestions -
      attempt.score;

    res.status(200).json({
      result: {
        contest: attempt.contest,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        timeTaken: attempt.timeTaken,
        submittedAt: attempt.submittedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAttemptStatus = async (req, res) => {
  try {
    const { contestId } = req.params;

    const attempt = await ContestAttempt.findOne({
      contest: contestId,
      user: req.user.userId,
    });

    if (!attempt) {
      return res.status(200).json({
        attemptStatus: "NOT_STARTED",
      });
    }

    if (attempt.isSubmitted) {
      return res.status(200).json({
        attemptStatus: "SUBMITTED",
        attemptId: attempt._id,
      });
    }

    res.status(200).json({
      attemptStatus: "IN_PROGRESS",
      attemptId: attempt._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};