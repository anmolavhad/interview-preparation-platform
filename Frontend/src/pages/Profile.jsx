import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data.user);
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
    <>
      <Navbar />

      <div className="profile-page">
        <h1>Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user.role === "admin" ? "Admin" : "Student"}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;