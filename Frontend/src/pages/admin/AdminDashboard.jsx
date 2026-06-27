import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <div className="admin-grid">
          <Link
            to="/admin/add-question"
            className="admin-card"
          >
            <h2>Add Question</h2>

            <p>Create new questions.</p>
          </Link>

          <Link
            to="/admin/questions"
            className="admin-card"
          >
            <h2>Show Questions</h2>

            <p>View all questions.</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;