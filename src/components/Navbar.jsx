import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css"

function Navbar() {
  
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path); // Redirige a la ruta especificada
  };
  
  return (
    <div className="navbar-global">
      <div className="navbar">
        <div className="navbar-icon">
          Icon
        </div>
        <div className="navbar-options">
          <Link to="/">Home</Link>
          <Link to="/catalogue">Catalogue</Link>
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
          <a href="#">Search</a>
          <a href="#">Pfp</a>
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