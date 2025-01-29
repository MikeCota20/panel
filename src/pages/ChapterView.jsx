import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import "../styles/chapterViewer.css"

function Viewer() {
  const { id } = useParams(); // Obtiene el ID del capítulo desde la URL
  const [pages, setPages] = useState([]);
  const [chapterInfo, setChapterInfo] = useState({ chapter_title: '', manga_title: '' });
  const [loading, setLoading] = useState(true);

  // Fetch de las páginas del capítulo desde la API
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chapters/${id}/pages`);
        setPages(response.data);

        const chapterResponse = await axios.get(`http://localhost:5000/api/chapters/${id}`);
        setChapterInfo(chapterResponse.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [id]); // Se ejecuta cada vez que cambia la ID del capítulo

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div> 
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {chapterInfo.manga_title} - {chapterInfo.chapter_title}
      </h1>

      {/* Solo se muestra la primera imagen en la página */}
      <div style={{ textAlign: 'center' }} className='mediaViewerContainer'>
        {pages.length > 0 ? (
          <LightGallery speed={500} mode="lg-fade">
            {/* Muestra solo la primera imagen en la página, sin repetirla en la galería */}
            <a href={`/comics/${pages[0].image_url}`} key={pages[0].id}>
              <img
                src={`/comics/${pages[0].image_url}`}
                alt={`Page ${pages[0].page_number}`}
                style={{ width: '80%', cursor: 'pointer' }}
              />
            </a>

            {/* Muestra todas las imágenes para la galería, excepto la primera */}
            {pages.slice(1).map((page) => (
              <a href={`/comics/${page.image_url}`} key={page.id}>
                <img
                  src={`/comics/${page.image_url}`}
                  alt={`Page ${page.page_number}`}
                  style={{ display: 'none' }} // Oculta las imágenes fuera de la galería
                />
              </a>
            ))}
          </LightGallery>
        ) : (
          <p>No pages available for this chapter.</p>
        )}
      </div>
      <Comments />
      
    </div>
  );
}

export default Viewer;
