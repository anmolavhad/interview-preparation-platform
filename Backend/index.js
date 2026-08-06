import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import testAttemptRoutes from "./src/routes/testAttemptRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";
import contestRoutes from "./src/routes/contestRoutes.js";
import contestAttemptRoutes from "./src/routes/contestAttemptRoutes.js";
import leaderboardRoutes from "./src/routes/leaderboardRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/test-attempts", testAttemptRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/contests",contestRoutes);
app.use("/api/contest-attempts", contestAttemptRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});