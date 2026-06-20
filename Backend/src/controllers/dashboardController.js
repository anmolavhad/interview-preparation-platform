import TestAttempt from "../models/TestAttempt.js";

export const getDashboard = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({user: req.user.userId });
    const totalTests = attempts.length;

    const averageAccuracy = totalTests > 0 ? Number((attempts.reduce((sum, a) => sum + a.accuracy, 0) / totalTests).toFixed(2)) : 0;

    const bestScore = totalTests > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
    const mockTests = attempts.filter(a => a.testType === "mock").length;

    const subjectWiseTests = {};
    attempts.forEach(a => {
      if (a.testType === "subject" && a.subject) {
        subjectWiseTests[a.subject] = (subjectWiseTests[a.subject] || 0) + 1;
      }
    });

    res.status(200).json({
      dashboard: { totalTests, mockTests, averageAccuracy, bestScore, subjectWiseTests }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};