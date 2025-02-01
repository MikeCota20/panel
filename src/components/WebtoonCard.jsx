import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholder from "../assets/imgs/istockphoto-1147544807-612x612.jpg";
import "../styles/mangaCard.css";

function WebtoonCard() {
  const [comics, setComics] = useState([]); // Estado para almacenar los mangas
  const [loading, setLoading] = useState(true); // Estado de carga

  // useEffect para obtener los datos de los mangas desde la API
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/webtoons');
        setComics(response.data); // Actualiza el estado con los mangas obtenidos
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchComics();
  }, []); // Se ejecuta solo una vez al montar el componente

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="manga-cards-container">
      {comics.length > 0 ? (
        comics.map((manga, index) => (  // Cambié 'mangas' a 'manga'
          <div className="template" key={manga.id}>  {/* Cambié 'mangas.id' a 'manga.id' */}
            <Link to={`/title?id=${manga.id}`}>
              <div className="template-img">
                <img src={manga.cover || placeholder} alt={manga.title} /> {/* Usé 'manga.cover' para la imagen */}
              </div>
            </Link>
            <h2>{manga.title}</h2>
          </div>
        ))
      ) : (
        <p>Webtoon not found.</p>
      )}

    </div>
  );
}

export default WebtoonCard;
