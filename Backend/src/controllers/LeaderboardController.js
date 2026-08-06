import Contest from "../models/Contest.js";
import ContestAttempt from "../models/ContestAttempt.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { contestId } = req.params;

    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({
        message: "Contest not found",
      });
    }

    const attempts = await ContestAttempt.find({
      contest: contestId,
      isSubmitted: true,
    })
      .populate("user", "name")
      .sort({
        score: -1,
        timeTaken: 1,
        submittedAt: 1,
      });

    const leaderboard = attempts.map((attempt, index) => ({
      rank: index + 1,
      
      userId: attempt.user._id,

      name: attempt.user.name,

      score: attempt.score,

      totalQuestions: attempt.totalQuestions,

      timeTaken: attempt.timeTaken,

      submittedAt: attempt.submittedAt,
    }));

    res.status(200).json({
      contest: {
        _id: contest._id,
        title: contest.title,
      },
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};