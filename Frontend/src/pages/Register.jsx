import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";

import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          Register
        </h1>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            className="auth-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;