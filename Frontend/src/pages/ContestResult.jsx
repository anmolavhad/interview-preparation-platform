import { useEffect, useState } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/ContestResult.css";

function ContestResult() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const response = await api.get(
        `/contest-attempts/${attemptId}`
      );

      setResult(response.data.result);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to fetch result."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="contest-result-page">
        <div className="result-card">
          <h1>Contest Submitted Successfully 🎉</h1>

          <h2>{result.contest.title}</h2>

          <div className="result-grid">
            <div className="result-item">
              <h3>Score</h3>

              <p>
                {result.score} / {result.totalQuestions}
              </p>
            </div>

            <div className="result-item">
              <h3>Accuracy</h3>

              <p>{result.accuracy}%</p>
            </div>

            <div className="result-item">
              <h3>Correct</h3>

              <p>{result.correctAnswers}</p>
            </div>

            <div className="result-item">
              <h3>Wrong</h3>

              <p>{result.wrongAnswers}</p>
            </div>

            <div className="result-item">
              <h3>Time Taken</h3>

              <p>
                {Math.floor(result.timeTaken / 60)} min{" "}
                {result.timeTaken % 60} sec
              </p>
            </div>

            <div className="result-item">
              <h3>Submitted At</h3>

              <p>
                {new Date(
                  result.submittedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="result-buttons">
            <button
              className="leaderboard-btn"
              onClick={() =>
                navigate(`/contest/${result.contest._id}/leaderboard`)
              }
            >
              View Leaderboard
            </button>

            <Link
              to="/contests"
              className="back-btn"
            >
              Back to Contest Hub
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestResult;