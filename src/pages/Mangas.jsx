import React from "react";
import { Link } from "react-router-dom";
import "../styles/categoryView.css"
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import MangaCard from "../components/MangaCard";

function Mangas() {

    const repeatCount = 1;

    return (
      <div className="manga-global">
        <div className="manga-section">
            <h1>Manga</h1>
            <div className="manga-filters">
                <div className="dropdown">
                    <button>Filter</button>
                    <div className="dropdown-content">
                        <a href="#">element</a>
                        <a href="#">element</a>
                        <a href="#">element</a>
                    </div>
                </div>
                <input type="text" placeholder="Search.."></input>
                <button>Sumbit</button>
            </div>
        </div>
        <div className="manga-list">
            {/* {Array.from({ length: repeatCount }).map((_, index) => (
                <MangaCard key={index} index={index + 1} />
            ))} */}
            <MangaCard/>
        </div>
        
      </div>
    );
  }
  
  export default Mangas;
  