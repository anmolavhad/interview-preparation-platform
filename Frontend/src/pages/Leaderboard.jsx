import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/Leaderboard.css";

function Leaderboard() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get(
        `/leaderboard/${id}`
      );

      setContest(response.data.contest);
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${String(remainingSeconds).padStart(2, "0")}s`;
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="leaderboard-page">
        <div className="leaderboard-header">
          <h1>{contest.title}</h1>
          <p>Contest Leaderboard</p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="empty-state">
            No submissions yet.
          </div>
        ) : (
          <div className="leaderboard-table">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.userId}>
                    <td>
                      {user.rank === 1
                        ? "🥇"
                        : user.rank === 2
                        ? "🥈"
                        : user.rank === 3
                        ? "🥉"
                        : user.rank}
                    </td>

                    <td>{user.name}</td>

                    <td>
                      {user.score}/{user.totalQuestions}
                    </td>

                    <td>
                      {formatTime(user.timeTaken)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Leaderboard;