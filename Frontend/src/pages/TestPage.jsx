import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
      (answer) =>
        answer.questionId ===
        question._id
    );

  if (existingIndex !== -1) {
    updatedAnswers[
      existingIndex
    ].selectedAnswer =
      option;
  } else {
    updatedAnswers.push({
      questionId:
        question._id,
      selectedAnswer:
        option,
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
        attempt:
          response.data.attempt,
      },
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
    alert(
      error.response?.data
        ?.message ||
      "Submission Failed"
    );
  }
};

    return (
  <div>
    <h2>
      Question {currentQuestion + 1}
      {" "}of{" "}
      {questions.length}
    </h2>

    <h3>
      {question.question}
    </h3>

    {question.options.map(
      (option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name="option"
              checked={
                answers.find(
                  (answer) =>
                    answer.questionId ===
                      question._id &&
                    answer.selectedAnswer ===
                      option
                )
              }
              onChange={() =>
                handleAnswerSelect(
                  option
                )
              }
            />

            {option}
          </label>
        </div>
      )
    )}

    <br />

    <div>
  <button
    disabled={
      currentQuestion === 0
    }
    onClick={() =>
      setCurrentQuestion(
        currentQuestion - 1
      )
    }
  >
    Previous
  </button>

  {currentQuestion ===
  questions.length - 1 ? (
    <button
      onClick={handleSubmit}
    >
      Submit Test
    </button>
  ) : (
    <button
      onClick={() =>
        setCurrentQuestion(
          currentQuestion + 1
        )
      }
    >
      Next
    </button>
  )}
    </div>
  </div>
);
}

export default TestPage;