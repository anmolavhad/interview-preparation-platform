import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/StartTest.css";

function StartTest() {
  const [testType, setTestType] = useState("mock");
  const [subject, setSubject] = useState("DSA");
  const navigate = useNavigate();
  
  const handleStartTest = async () => {
  try {
    let url =
      "/tests/start?type=" +
      testType;

    if (
      testType === "subject"
    ) {
      url +=
        "&subject=" +
        subject;
    }

    const response =
      await api.get(url);

    navigate("/test", {
      state: {
        questions:
          response.data.questions,
        testType,
        subject,
      },
    });
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
      "Failed to start test"
    );
  }
};
  return (
    <div className="start-test">
      <div className="test-card">
        <h1>Start Test</h1>

        <select
          value={testType}
          onChange={(e) =>
            setTestType(
              e.target.value
            )
          }
        >
          <option value="mock">
            Mock Test
          </option>

          <option value="subject">
            Subject Test
          </option>
        </select>

        {testType === "subject" && (
          <select
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
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
        )}

        <button onClick={handleStartTest}>
          Start Test
        </button>
      </div>
    </div>
  );
}

export default StartTest;