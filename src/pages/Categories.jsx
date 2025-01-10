import React from "react";
import { Link } from "react-router-dom";
import "../styles/categories.css"
// import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import mangaCover from "../assets/imgs/718JwPwNKiL._AC_UF894,1000_QL80_.jpg"
import comicCover from "../assets/imgs/91h+D8QUxsL._UF1000,1000_QL80_.jpg"
import webtoonCover from "../assets/imgs/816hywlmu-L.jpg"

function Categories() {
    return (
      <div className="categories-global">   
        <div className="categories-element">
            <h1>Manga</h1>
            <Link to="/manga">
              <img src={mangaCover} alt="placeholder" />
            </Link>
        </div>
        <div className="categories-element">
            <h1>Webtoon</h1>
            <Link to="/webtoons">
              <img src={webtoonCover} alt="placeholder" />
            </Link>
            
        </div>
        <div className="categories-element">
            <h1>Comics</h1>
            <Link to="/comics">
              <img src={comicCover} alt="placeholder" />
            </Link>
        </div>

      </div>
    );
  }
  
  export default Categories;
  