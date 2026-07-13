import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link
        to="/dashboard"
        className="logo">
        Interview Prep
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/start-test">
          Start Test
        </Link>
        <Link to="/contests">
          Contests
        </Link>
        <Link to="/profile">
          Profile
        </Link>

        <Link to="/history">
          History
        </Link>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;