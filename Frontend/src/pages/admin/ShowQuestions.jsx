import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import "../../styles/ShowQuestions.css";

function ShowQuestions() {
  const [questions, setQuestions] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [page]);

  const fetchQuestions = async () => {
    try {
      const response =
        await api.get(
          `/questions?page=${page}`
        );

      setQuestions(
        response.data.questions
      );

      setTotalPages(
        response.data.totalPages
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this question?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(
        `/questions/${id}`
      );

      fetchQuestions();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Delete Failed"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="show-page">

        <h1>
          Question Management
        </h1>

        {questions.map(
          (question) => (
            <div
              key={question._id}
              className="question-card"
            >

              <div className="question-top">

                <h2>
                  {question.question}
                </h2>

                <div className="badge-container">

                  <span className="subject">
                    {question.subject}
                  </span>

                  <span className="difficulty">
                    {question.difficulty}
                  </span>

                </div>

              </div>

              <div className="options">

                {question.options.map(
                  (
                    option,
                    index
                  ) => (
                    <p key={index}>
                      {index + 1}. {option}
                    </p>
                  )
                )}

              </div>

              <p>
                <strong>
                  Correct Answer:
                </strong>{" "}
                {
                  question.correctAnswer
                }
              </p>

              <p>
                <strong>
                  Explanation:
                </strong>{" "}
                {
                  question.explanation
                }
              </p>

              <div className="action-buttons">

                <Link
                  to={`/admin/edit-question/${question._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      question._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          )
        )}

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default ShowQuestions; 