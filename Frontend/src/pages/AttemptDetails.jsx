import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AttemptDetails.css";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function AttemptDetails() {
  const { id } = useParams();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempt();
  }, []);

  const fetchAttempt = async () => {
    try {
      const response = await api.get(`/test-attempts/${id}`);
      setAttempt(response.data.attempt);
    } catch (error) {
      console.log(error);
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

      <div className="attempt-page">
        <h1>Attempt Details</h1>

        <h3>
          Score: {attempt.score}/{attempt.totalQuestions}
        </h3>

        <h3>Accuracy: {attempt.accuracy}%</h3>

        {attempt.answers.map((answer, index) => (
          <div key={index} className="answer-card">
            <h3>Question {index + 1}</h3>

            <p>{answer.question}</p>

            <p>
              <strong>Your Answer:</strong> {answer.selectedAnswer}
            </p>

            <p>
              <strong>Correct Answer:</strong> {answer.correctAnswer}
            </p>

            <p>
              <strong>Result:</strong>{" "}
              {answer.isCorrect ? "✅ Correct" : "❌ Wrong"}
            </p>

            <p>
              <strong>Explanation:</strong> {answer.explanation}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AttemptDetails;    