import React from "react";
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";

function MangaCard({ index }) {
  return (
    <div className="template">
        <div className="template-img">
            <img src={placeholder} alt="placeholder" />
        </div>
      <h2>Plantilla {index}</h2>
      <p>Este es un ejemplo de contenido repetido.</p>
    </div>
  );
}

export default MangaCard;