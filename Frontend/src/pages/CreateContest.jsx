import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/CreateContest.css";

function CreateContest() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/questions/all");
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSelect = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(
        selectedQuestions.filter((questionId) => questionId !== id)
      );
    } else {
      setSelectedQuestions([
        ...selectedQuestions,
        id,
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedQuestions.length === 0) {
      return alert("Please select at least one question.");
    }

    try {
      await api.post("/contests", {
        title,
        description,
        startTime,
        duration,
        questions: selectedQuestions,
      });

      alert("Contest Created Successfully");
      navigate("/admin/contests");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create contest"
      );
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const subjectMatch =
      subject === "" ||
      question.subject === subject;

    const difficultyMatch =
      difficulty === "" ||
      question.difficulty === difficulty;

    return (
      subjectMatch &&
      difficultyMatch
    );
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="create-contest-page">
        <h1>Create Contest</h1>

        <form
          className="contest-form"
          onSubmit={handleSubmit}
        >
            <div className="form-group">
            <label>Contest Title</label>

            <input
              type="text"
              placeholder="Enter contest title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Enter contest description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (Minutes)</label>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
          </div>

          <hr className="divider" />

          <h2>Select Questions</h2>

          <div className="filter-row">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="DSA">DSA</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">OS</option>
              <option value="CN">CN</option>
              <option value="OOP">OOP</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <p className="selected-count">
            Selected Questions: <strong>{selectedQuestions.length}</strong>
          </p>

          <div className="question-list">
            {filteredQuestions.map((question) => (
              <div
                key={question._id}
                className="question-card"
              >
                <label>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleQuestionSelect(question._id)}
                  />

                  <div className="question-info">
                    <h4>{question.question}</h4>

                    <p>
                      {question.subject}
                      {" | "}
                      {question.difficulty}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="submit-section">
            <button
              type="submit"
              className="create-btn"
            >
              Create Contest
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateContest;
