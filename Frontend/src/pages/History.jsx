import { useEffect, useState } from "react";
import "../styles/History.css";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function History() {
  const [attempts, setAttempts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response =
        await api.get(
          "/test-attempts/my-attempts"
        );

      setAttempts(
        response.data.attempts
      );
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

      <div className="history-page">
        <h1>Test History</h1>

        {attempts.length === 0 ? (
          <div className="empty-history">
            No tests attempted yet.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {attempts.map(
                (attempt) => (
                  <tr
                    key={attempt._id}
                  >
                    <td>
                      {
                        attempt.testType
                      }
                    </td>

                    <td>
                      {attempt.subject ||
                        "-"}
                    </td>

                    <td>
                      {attempt.score}
                    </td>

                    <td>
                      {
                        attempt.accuracy
                      }
                      %
                    </td>

                    <td>
                      {new Date(
                        attempt.createdAt
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <Link
                        to={`/attempt/${attempt._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default History;