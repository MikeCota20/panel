import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import {useState} from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:5000/api/login", {
              email,
              password
          });
          const { token } = response.data;
          localStorage.setItem("token", token);
          alert("Successfully Logged in.");
          window.location.href = "/"; // Redirigir al home después del login
      } catch (error) {
          alert("Error at logging in.");
      }
  };


    return (
      <div className="login-global">
        <form onSubmit={handleSubmit}>
          <div className="login-container">
            <h1>Log In</h1>
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
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button type="submit">Log In</button> 
              <p>Don't have an user?</p>
              <Link to="/register">Register now!</Link>
          </div>
        </form>
        
      </div>
    );
  }
  
export default Login;