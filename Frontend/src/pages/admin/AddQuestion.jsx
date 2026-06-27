import { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import "../../styles/AddQuestion.css";

function AddQuestion() {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    subject: "DSA",
    difficulty: "Easy",
    explanation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];

    updatedOptions[index] = value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/questions", formData);

      alert("Question Added Successfully");

      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        subject: "DSA",
        difficulty: "Easy",
        explanation: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to Add Question"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-question-page">

        <div className="question-form-card">

          <h1>Add Question</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="question"
              placeholder="Question"
              value={formData.question}
              onChange={handleChange}
              required
            />

            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(
                    index,
                    e.target.value
                  )
                }
                required
              />
            ))}

            <input
              type="text"
              name="correctAnswer"
              placeholder="Correct Answer"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option>DSA</option>
              <option>DBMS</option>
              <option>OS</option>
              <option>CN</option>
              <option>OOP</option>
            </select>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <textarea
              name="explanation"
              placeholder="Explanation"
              value={formData.explanation}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Add Question
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddQuestion;