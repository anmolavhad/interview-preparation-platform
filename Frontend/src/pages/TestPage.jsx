import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/TestPage.css";
import Navbar from "../components/Navbar";

function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { questions, testType, subject } = location.state || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);
  const question = questions[currentQuestion];
  
  const handleAnswerSelect = (option) => {
  const updatedAnswers = [...answers];

  const existingIndex =
    updatedAnswers.findIndex(
      (answer) => answer.questionId === question._id
    );

  if (existingIndex !== -1) {
    updatedAnswers[existingIndex].selectedAnswer = option;
  } else {
    updatedAnswers.push({
      questionId:question._id,
      selectedAnswer:option,
    });
  }

  setAnswers(updatedAnswers);
};
  //submit
const handleSubmit = async () => {
  try {
    const response =
      await api.post(
        "/test-attempts",
        {
          testType,
          subject,
          answers,
        }
      );

    navigate("/result", {
      state: {
        attempt: response.data.attempt,
      },
    });
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
      "Submission Failed"
    );
  }
};

  return (
  <>
    <Navbar />

    <div className="test-page">
      <div className="question-card">
        <div className="question-header">
          <span className="question-badge">
            Question {currentQuestion + 1}
          </span>

          <span className="question-progress">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <h2 className="question-text">
          {question.question}
        </h2>

        <div className="options-container">
          {question.options.map((option) => (
            <label
              key={option}
              className={`option-card ${
                answers.find(
                  (answer) =>
                    answer.questionId === question._id &&
                    answer.selectedAnswer === option
                )
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="option"
                checked={
                  answers.find(
                    (answer) =>
                      answer.questionId === question._id &&
                      answer.selectedAnswer === option
                  )
                }
                onChange={() => handleAnswerSelect(option)}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            className="prev-btn"
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion(currentQuestion - 1)
            }
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          ) : (
            <button
              className="next-btn"
              onClick={() =>
                setCurrentQuestion(currentQuestion + 1)
              }
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  </>
);
}

export default TestPage;