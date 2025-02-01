import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import "../styles/mangaCard.css";

function ComicCard({ comics }) { // Recibe la lista de cómics como prop

    return (
        <div className="manga-cards-container">
            {comics.length > 0 ? (
                comics.map((comic) => (
                    <div className="template" key={comic.id}>
                        <Link to={`/title?id=${comic.id}`}>
                            <div className="template-img">
                                <img src={comic.cover || placeholder} alt={comic.title} />
                            </div>
                        </Link>
                        <h2>{comic.title}</h2>
                    </div>
                ))
            ) : (
                <p>Comic not found.</p>
            )}
        </div>
    );
}

export default ComicCard;
