import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/Admin.css";

function Admin() {
  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      subject: "DSA",
      difficulty: "Easy",
      explanation: "",
    });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response =
        await api.get("/questions");

      setQuestions(
        response.data.questions
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleOptionChange = (
    index,
    value
  ) => {
    const updatedOptions = [
      ...formData.options,
    ];

    updatedOptions[index] =
      value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          "/questions",
          formData
        );

        alert(
          "Question Added Successfully"
        );

        fetchQuestions();

        setFormData({
          question: "",
          options: [
            "",
            "",
            "",
            "",
          ],
          correctAnswer: "",
          subject: "DSA",
          difficulty: "Easy",
          explanation: "",
        });
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to add question"
        );
      }
    };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <h1>
          Question Management
        </h1>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>
              Total Questions
            </h3>

            <p>
              {questions.length}
            </p>
          </div>
        </div>

        <form
          className="question-form"
          onSubmit={handleSubmit}
        >
          <h2>Add Question</h2>

          <input
            type="text"
            name="question"
            placeholder="Question"
            value={
              formData.question
            }
            onChange={
              handleChange
            }
            required
          />

          {formData.options.map(
            (
              option,
              index
            ) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${
                  index + 1
                }`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(
                    index,
                    e.target.value
                  )
                }
                required
              />
            )
          )}

          <input
            type="text"
            name="correctAnswer"
            placeholder="Correct Answer"
            value={
              formData.correctAnswer
            }
            onChange={
              handleChange
            }
            required
          />

          <select
            name="subject"
            value={
              formData.subject
            }
            onChange={
              handleChange
            }
          >
            <option value="DSA">
              DSA
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="OS">
              OS
            </option>

            <option value="CN">
              CN
            </option>

            <option value="OOP">
              OOP
            </option>
          </select>

          <select
            name="difficulty"
            value={
              formData.difficulty
            }
            onChange={
              handleChange
            }
          >
            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>
          </select>

          <textarea
            name="explanation"
            placeholder="Explanation"
            value={
              formData.explanation
            }
            onChange={
              handleChange
            }
            required
          />

          <button type="submit">
            Add Question
          </button>
        </form>

        <div className="question-list">
          {questions.map(
            (question) => (
              <div
                key={
                  question._id
                }
                className="question-card"
              >
                <h3>
                  {
                    question.question
                  }
                </h3>

                <p>
                  <strong>
                    Subject:
                  </strong>{" "}
                  {
                    question.subject
                  }
                </p>

                <p>
                  <strong>
                    Difficulty:
                  </strong>{" "}
                  {
                    question.difficulty
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;