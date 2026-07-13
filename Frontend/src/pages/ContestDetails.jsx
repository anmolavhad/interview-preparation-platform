import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/ContestDetails.css";

function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    fetchContest();
  }, []);

  const fetchContest = async () => {
    try {
      const response = await api.get(`/contests/${id}`);
      setContest(response.data.contest);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to load contest."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartContest = async () => {
    try {
      setStarting(true);

      const response = await api.post(
        `/contest-attempts/start/${id}`
      );

      navigate(`/contest/${id}/test`, {
        state: {
          contest: response.data.contest,
          attemptId: response.data.attemptId,
        },
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to start contest."
      );
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="contest-details-page">
        <div className="contest-header">
          <h1>{contest.title}</h1>

          <span
            className={`status ${contest.status.toLowerCase()}`}
          >
            {contest.status}
          </span>
        </div>

        <div className="contest-description">
          <p>{contest.description}</p>
        </div>

        <div className="contest-info-grid">
          <div className="info-card">
            <h4>Questions</h4>
            <p>{contest.questionCount}</p>
          </div>

          <div className="info-card">
            <h4>Duration</h4>
            <p>{contest.duration} Minutes</p>
          </div>

          <div className="info-card">
            <h4>Participants</h4>
            <p>{contest.participants}</p>
          </div>

          <div className="info-card">
            <h4>Starts At</h4>

            <p>
              {new Date(contest.startTime).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="rules-card">
          <h2>Contest Rules</h2>

          <ul>
            <li>Only one attempt is allowed.</li>

            <li>
              Every correct answer carries <strong>1 mark</strong>.
            </li>

            <li>
              There is <strong>no negative marking</strong>.
            </li>

            <li>
              Timer starts immediately after clicking Start Contest.
            </li>

            <li>
              Contest will be auto-submitted when time expires.
            </li>

            <li>
              Do not refresh or close the browser during the contest.
            </li>
          </ul>
        </div>

        <div className="start-btn-container">
          <button
            className="start-contest-btn"
            disabled={
              contest.status !== "Live" ||
              starting
            }
            onClick={handleStartContest}
          >
            {contest.status === "Upcoming"
              ? "Contest Not Started"
              : contest.status === "Completed"
              ? "Contest Ended"
              : starting
              ? "Starting..."
              : "Start Contest"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ContestDetails;  