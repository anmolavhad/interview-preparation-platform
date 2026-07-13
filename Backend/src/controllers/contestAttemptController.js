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

    res.status(200).json({
      attemptId: attempt._id,
      contest: {
        _id: contest._id,
        title: contest.title,
        duration: contest.duration,
        questions: contest.questions,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};    