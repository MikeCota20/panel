import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";
import "../styles/login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      alert(response.data); // Muestra un mensaje de éxito
      navigate("/login"); // Redirige al login tras el registro exitoso
    } catch (error) {
      alert("Error when registering user.");
    }
  };

  return (
    <div className="login-global">
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h1>Register</h1>
          <div className="login-content">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-content">
            <label>Username</label>
            <input
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}                    
            />
          </div>
          <div className="login-content">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-content">
            <label>Re-Enter Password</label>
            <input 
              type="password" 
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
