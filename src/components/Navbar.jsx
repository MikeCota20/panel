import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css"
import logo from "../assets/imgs/f05ef210-a395-401e-967e-c35ad3052220.webp";
import default_pfp from "../assets/pfps/default-pfp-v0-1to4yvt3i88c1.webp"

function Navbar() {
  
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path); // Redirige a la ruta especificada
  };
  
  return (
    <div className="navbar-global">
      <div className="navbar">
        <div className="navbar-icon">
          <Link to="/">
            <img src={logo}alt="logo"></img>
          </Link>
        </div>
        <div className="navbar-options">
          <button className="navbar-button" onClick={() => handleRedirect("/")}>
            Home
          </button>
          <div className="dropdown">
            <button onClick={() => handleRedirect("/catalogue")}>
              Catalogue
            </button>
            <div className="dropdown-content">
              <Link to="/manga">Manga</Link>
              <Link to="/comics">Comics</Link>
              <Link to="/webtoons">Webtoons</Link>
            </div>
          </div>
          <input type="text" placeholder="Search..."  className="navbar-search"/>
          <div className="navbar-user">
              <img src={default_pfp} alt="Profile Picture" />
              <div className="dropdown-content">
                  <Link to="/Login">Log in</Link>
                  <Link to="/Register">Register</Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Navbar;
  

            // <div className="dropdown">
            //   <button>Test</button>
            //   <div className="dropdown-content">
            //     <a href="#">element</a>
            //     <a href="#">element</a>
            //     <a href="#">element</a>
            //   </div>
            // </div>