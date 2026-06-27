import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

import "../styles/Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboard(
        response.data.dashboard
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
    <><Navbar />
    <div className="dashboard">
      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tests</h3>
          <p>
            {dashboard.totalTests}
          </p>
        </div>

        <div className="stat-card">
          <h3>Mock Tests</h3>
          <p>
            {dashboard.mockTests}
          </p>
        </div>

        <div className="stat-card">
          <h3>Best Accuracy</h3>
          <p>
            {dashboard.bestAccuracy}%
          </p>
        </div>

        <div className="stat-card">
          <h3>Average Accuracy</h3>
          <p>
            {dashboard.averageAccuracy}%
          </p>
        </div>
      </div>

      <div className="subject-section">
        <h2>
          Subject Tests
        </h2>

        {Object.entries(
          dashboard.subjectWiseTests
        ).map(
          ([subject, count]) => (
            <div
              key={subject}
              className="subject-item"
            >
              {subject} : {count}
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
}

export default Dashboard; 