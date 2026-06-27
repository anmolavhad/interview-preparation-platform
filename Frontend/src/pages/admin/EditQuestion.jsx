import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import "../../styles/AddQuestion.css";

function EditQuestion() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    subject: "",
    difficulty: "",
    explanation: "",
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await api.get(
        `/questions/${id}`
      );

      setFormData(response.data.question);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch question"
      );
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

    updatedOptions[index] = value;

    setFormData({
      ...formData,
      options: updatedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/questions/${id}`,
        formData
      );

      alert(
        "Question Updated Successfully"
      );

      navigate(
        "/admin/questions"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update question"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="add-question-page">
        <div className="question-form-card">
          <h1>Edit Question</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="question"
              placeholder="Question"
              value={formData.question}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />

            <button type="submit">
              Update Question
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditQuestion;