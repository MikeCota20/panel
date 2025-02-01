import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import "../styles/mangaCard.css";

function MangaCard({ mangas }) { // Recibe la lista de mangas como prop

    return (
        <div className="manga-cards-container">
            {mangas.length > 0 ? (
                mangas.map((manga) => (
                    <div className="template" key={manga.id}>
                        <Link to={`/title?id=${manga.id}`}>
                            <div className="template-img">
                                <img src={manga.cover || placeholder} alt={manga.title} />
                            </div>
                        </Link>
                        <h2>{manga.title}</h2>
                    </div>
                ))
            ) : (
                <p>Manga not found.</p>
            )}
        </div>
    );
}

export default MangaCard;
