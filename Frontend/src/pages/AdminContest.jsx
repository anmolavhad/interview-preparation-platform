import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/AdminContest.css";

function AdminContest() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await api.get("/contests");
      setContests(response.data.contests);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contest?")) {
      return;
    }

    try {
      await api.delete(`/contests/${id}`);
      fetchContests();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const upcoming = contests.filter((contest) => contest.status === "Upcoming");
  const live = contests.filter((contest) => contest.status === "Live");
  const completed = contests.filter((contest) => contest.status === "Completed");

  return (
    <>
      <Navbar />

      <div className="contest-page">
        <div className="contest-header">
          <h1>Contest Management</h1>

          <Link
            to="/admin/contest/create"
            className="create-btn"
          >
            + Create Contest
          </Link>
        </div>

        <ContestTable
          title="Upcoming Contests"
          contests={upcoming}
          handleDelete={handleDelete}
        />

        <ContestTable
          title="Live Contests"
          contests={live}
          handleDelete={handleDelete}
        />

        <ContestTable
          title="Completed Contests"
          contests={completed}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

function ContestTable({ title, contests, handleDelete }) {
  return (
    <div className="contest-section">
      <h2>{title}</h2>

      {contests.length === 0 ? (
        <p>No contests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Contest</th>
              <th>Participants</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id}>
                <td>{contest.title}</td>

                <td>{contest.participants}</td>

                <td>{contest.duration} min</td>

                <td>{contest.questionCount}</td>

                <td>
                  {new Date(contest.startTime).toLocaleDateString()}
                </td>

                <td>
                  <Link
                    to={`/admin/contest/${contest._id}`}
                    className="action-btn view"
                  >
                    View
                  </Link>

                  <Link
                    to={`/admin/contest/edit/${contest._id}`}
                    className="action-btn edit"
                  >
                    Edit
                  </Link>

                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(contest._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminContest;