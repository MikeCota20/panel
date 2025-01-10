import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import { useState } from "react"; 
import axios from "axios";

function Register() {

  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/register", {
            username,
            email,
            password
        });
        alert(response.data);
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
                  <label>Password</label>
                  <input></input>
              </div>
              <button type="submit">Register</button>
          </div>
        </form>
        
      </div>
    );
  }
  
export default Register;