import Contest from "../models/Contest.js";
import ContestAttempt from "../models/ContestAttempt.js";
export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create({...req.body,createdBy: req.user.userId,});
    res.status(201).json({
      contest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContests = async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate("questions", "_id")
      .sort({ startTime: -1 });
    const contestsWithDetails = await Promise.all(
      contests.map(async (contest) => {
        const participants = await ContestAttempt.countDocuments({
          contest: contest._id,
        });

        let status;

        const now = new Date();

        const endTime = new Date(
          contest.startTime.getTime() + contest.duration * 60000
        );

        if (now < contest.startTime) {
          status = "Upcoming";
        } else if (now <= endTime) {
          status = "Live";
        } else {
          status = "Completed";
        }

        return {
          _id: contest._id,
          title: contest.title,
          duration: contest.duration,
          startTime: contest.startTime,
          questionCount: contest.questions.length,
          participants,
          status,
        };
      })
    );
    res.status(200).json({ contests: contestsWithDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate("questions", "_id");

    if (!contest) {
      return res.status(404).json({
        message: "Contest not found",
      });
    }
    
    const participants = await ContestAttempt.countDocuments({
      contest: contest._id,
    });

    const now = new Date();

    const endTime = new Date(
      contest.startTime.getTime() + contest.duration * 60000
    );

    let status;

    if (now < contest.startTime) {
      status = "Upcoming";
    } else if (now <= endTime) {
      status = "Live";
    } else {
      status = "Completed";
    }

    res.status(200).json({
      contest: {
        _id: contest._id,
        title: contest.title,
        description: contest.description,
        startTime: contest.startTime,
        duration: contest.duration,
        questionCount: contest.questions.length,
        participants,
        status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

