import Contest from "../models/Contest.js";

export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create({
      ...req.body,
      createdBy: req.user.id,
    });

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
    const contests = await Contest.find().populate("createdBy", "name").sort({ startTime: -1 });

    res.status(200).json({ contests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate("questions").populate("createdBy", "name");

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({ contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

