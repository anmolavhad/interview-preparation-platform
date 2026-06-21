import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/Result.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { attempt } = location.state || {};

  return (
    <div className="result-page">
      <div className="result-card">
        <h1 className="result-title">
          Test Result
        </h1>

        <div className="result-score">
          {attempt?.score}
        </div>

        <p className="result-info">
          Correct Answers: {attempt?.correctAnswers}
        </p>

        <p className="result-info">
          Accuracy: {attempt?.accuracy}%
        </p>

        <div className="result-buttons">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="history-btn"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;