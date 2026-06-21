import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

import "../styles/StartTest.css";

function StartTest() {
  const [subject, setSubject] = useState("DSA");

  const navigate = useNavigate();

  const handleStartTest = async (type) => {
    try {
      let url = "/tests/start?type=" + type;

      if (type === "subject") {
        url += "&subject=" + subject;
      }

      const response = await api.get(url);

      navigate("/test", {
        state: {
          questions: response.data.questions,
          testType: type,
          subject: type === "subject" ? subject : null,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to start test");
    }
  };

  return (
    <>
      <Navbar />

      <div className="start-test">
        <h1>Start Test</h1>

        <div className="test-options">
          {/* Subject Test */}

          <div className="test-card">
            <h2>Subject Test</h2>

            <p>
              Practice a specific subject and improve your skills.
            </p>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="DSA">DSA</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">OS</option>
              <option value="CN">CN</option>
              <option value="OOP">OOP</option>
            </select>

            <button onClick={() => handleStartTest("subject")}>
              Start Subject Test
            </button>
          </div>

          {/* Mock Test */}

          <div className="test-card">
            <h2>Mock Test</h2>

            <p>
              Mixed questions from all subjects to simulate a real placement test.
            </p>

            <button onClick={() => handleStartTest("mock")}>
              Start Mock Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartTest;