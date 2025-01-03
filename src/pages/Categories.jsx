import React from "react";
import { Link } from "react-router-dom";
import "../styles/categories.css"
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";

function Categories() {
    return (
      <div className="categories-global">
        <div className="categories-element">
            <h1>Manga</h1>
            <Link to="/manga">
              <img src={placeholder} alt="placeholder" />
            </Link>
        </div>
        <div className="categories-element">
            <h1>Webtoon</h1>
            <Link to="/webtoons">
              <img src={placeholder} alt="placeholder" />
            </Link>
            
        </div>
        <div className="categories-element">
            <h1>Comics</h1>
            <Link to="/comics">
              <img src={placeholder} alt="placeholder" />
            </Link>
        </div>

      </div>
    );
  }
  
  export default Categories;
  