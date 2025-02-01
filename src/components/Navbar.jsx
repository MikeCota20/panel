import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/imgs/f05ef210-a395-401e-967e-c35ad3052220.webp";
import default_pfp from "../assets/pfps/default-pfp-v0-1to4yvt3i88c1.webp";
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // Estado inicial null
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setProfilePicture(response.data.pfp ? `/pfps/${response.data.pfp}` : default_pfp);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfilePicture(null);
    navigate("/login");
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar-global">
      <div className="navbar">
        <div className="navbar-icon">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-options">
          <button className="navbar-button" onClick={() => handleRedirect("/")}>Home</button>
          <div className="dropdown">
            <button onClick={() => handleRedirect("/catalogue")}>Catalogue</button>
            <div className="dropdown-content">
              <Link to="/manga">Manga</Link>
              <Link to="/comics">Comics</Link>
              <Link to="/webtoons">Webtoons</Link>
            </div>
          </div>
          <input type="text" placeholder="Search..." className="navbar-search" />
          
          <div className="navbar-user">
            <img 
              src={profilePicture ? profilePicture : default_pfp} 
              alt="Profile Picture" 
              className="nav-pfp" 
            />
            
            <div className="dropdown-content">
              {user ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <a href="#" onClick={handleLogout} className="nav-but">
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login">Log in</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;