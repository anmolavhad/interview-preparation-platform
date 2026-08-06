import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/ContestTest.css";

function ContestTest() {
  const navigate = useNavigate();
  const location = useLocation();

  const contest = location.state?.contest;
  const attemptId = location.state?.attemptId;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const startTime = new Date(contest?.startTime);
  const endTime = new Date(startTime.getTime() + contest?.duration * 60000);
  const remainingTime = Math.max(0, Math.floor((endTime - new Date()) / 1000));
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  useEffect(() => {
    if (!contest) return;
    checkAttemptStatus();
    const interval = setInterval(() => {
      checkAttemptStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [contest]);

  useEffect(() => {
    if (!contest || !attemptId) {
      navigate("/contests");
      return;
    }
  }, [contest, attemptId, navigate]);

  useEffect(() => {
    if (!timeLeft) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const current = contest.questions[currentQuestion];
  const attemptStartTime = new Date(contest.attemptStartTime);
  const handleOptionSelect = (option) => {
    setAnswers({
      ...answers,
      [current._id]: option,
    });
  };

  const handleNext = () => {
    if (
      currentQuestion <
      contest.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const checkAttemptStatus = async () => {
    if (submitting) return;
    try {
      const { data } = await api.get(
        `/contest-attempts/status/${contest._id}`
      );

      if (data.attemptStatus === "SUBMITTED") {
        navigate(`/contest-result/${data.attemptId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );
      const response = await api.put(
        `/contest-attempts/${attemptId}/submit`,
        {
          answers: formattedAnswers,
          timeTaken: Math.floor((endTime - attemptStartTime.getTime()) / 1000) - timeLeft,
        }
      );

      navigate(`/contest-result/${attemptId}`, {
        state: {
          result: response.data,
        },
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Submission Failed"
      );
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
    return (
    <>
      <Navbar />

      <div className="contest-test-page">
        <div className="contest-header">
          <div>
            <h2>{contest.title}</h2>

            <p>
              Question {currentQuestion + 1} of{" "}
              {contest.questions.length}
            </p>
          </div>

          <div className="timer">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Contest"}
            </button>
        </div>

        <div className="contest-body">
          <div className="question-palette">
            <h3>Questions</h3>

            <div className="palette-grid">
              {contest.questions.map((question, index) => (
                <button
                  key={question._id}
                  className={`palette-btn ${
                    currentQuestion === index
                      ? "current"
                      : answers[question._id]
                      ? "answered"
                      : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="question-section">
            <div className="question-card">
              <h3>{current.question}</h3>

              <div className="options">
                {current.options.map((option, index) => (
                  <label
                    key={index}
                    className="option"
                  >
                    <input
                      type="radio"
                      name={current._id}
                      checked={answers[current._id] === option}
                      onChange={() => handleOptionSelect(option)}
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="navigation">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={
                  currentQuestion ===
                  contest.questions.length - 1
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestTest;