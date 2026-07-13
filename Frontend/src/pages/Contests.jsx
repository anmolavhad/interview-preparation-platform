import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/Contests.css";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await api.get("/contests");
      console.log(response.data.contests);
      setContests(response.data.contests);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const liveContests = contests.filter(
  contest => contest.status === "Live"
);

const upcomingContests = contests.filter(
  contest => contest.status === "Upcoming"
);

const completedContests = contests.filter(
  contest => contest.status === "Completed"
);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="contests-page">
        <h1>Contest Hub</h1>
                <section className="contest-section">
          <h2>🔴 Live Contests</h2>

          {liveContests.length === 0 ? (
            <p className="empty-message">
              No live contests.
            </p>
          ) : (
            <div className="contest-grid">
              {liveContests.map((contest) => (
                <div
                  key={contest._id}
                  className="contest-card live"
                >
                  <h3>{contest.title}</h3>

                  <p>{contest.description}</p>

                  <div className="contest-info">
                    <span>
                      Questions:{" "}
                      {contest.questionCount}
                    </span>

                    <span>
                      Duration:{" "}
                      {contest.duration} min
                    </span>
                  </div>

                  <Link
                    to={`/contest/${contest._id}`}
                    className="contest-btn"
                  >
                    Start Contest
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="contest-section">
          <h2>🟡 Upcoming Contests</h2>

          {upcomingContests.length === 0 ? (
            <p className="empty-message">
              No upcoming contests.
            </p>
          ) : (
            <div className="contest-grid">
              {upcomingContests.map((contest) => (
                <div
                  key={contest._id}
                  className="contest-card upcoming"
                >
                  <h3>{contest.title}</h3>

                  <p>{contest.description}</p>

                  <div className="contest-info">
                    <span>
                      Questions:{" "}
                      {contest.questionCount}
                    </span>

                    <span>
                      Duration:{" "}
                      {contest.duration} min
                    </span>
                  </div>

                  <p className="start-time">
                    Starts:{" "}
                    {new Date(contest.startTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
                <section className="contest-section">
          <h2> Contest History</h2>

          {completedContests.length === 0 ? (
            <p className="empty-message">
              No completed contests.
            </p>
          ) : (
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Contest</th>
                    <th>Questions</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {completedContests.map((contest) => (
                    <tr key={contest._id}>
                      <td>{contest.title}</td>

                      <td>{contest.questionCount}</td>

                      <td>{contest.duration} min</td>

                      <td>
                        {new Date(contest.startTime).toLocaleDateString()}
                      </td>

                      <td>
                        <Link
                          to={`/contest/${contest._id}`}
                          className="view-btn"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Contests;