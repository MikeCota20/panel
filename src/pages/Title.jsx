import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../styles/title.css"

function Title() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [manga, setManga] = useState(null); // Almacena los datos del cómic
    const [chapters, setChapters] = useState([]); // Almacena los capítulos del cómic
    const [loading, setLoading] = useState(true); // Estado de carga

    // Obtén el ID del cómic desde los parámetros de la URL
    const mangaId = searchParams.get('id');

    // useEffect para cargar los datos del cómic y sus capítulos cuando cambia el ID
    useEffect(() => {
        const fetchMangaAndChapters = async () => {
            if (mangaId) {
                setLoading(true); // Comienza el estado de carga
                try {
                    // Obtener datos del manga
                    const mangaResponse = await axios.get(`http://localhost:5000/api/titles?id=${mangaId}`);
                    setManga(mangaResponse.data);

                    // Obtener capítulos relacionados con el manga
                    const chaptersResponse = await axios.get(`http://localhost:5000/api/chapters?manga_id=${mangaId}`);
                    setChapters(chaptersResponse.data);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                } finally {
                    setLoading(false); // Finaliza la carga
                }
            }
        };

        fetchMangaAndChapters();
    }, [mangaId]); // Se ejecuta cada vez que cambia el ID del cómic

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : manga ? (
                <div>
                    <div className="title-banner">
                        <div className="title-img">
                            <img 
                                src={manga.cover}
                                alt={manga.title}
                            />
                        </div>
                        <div className="title-text">
                            <h1>{manga.title}</h1>
                            <p><strong>Author:</strong> {manga.author}</p>
                            <p><strong>Genre:</strong> {manga.genre}</p>
                            <p><strong>Synopsis:</strong> {manga.synopsis}</p>
                        </div>
                    </div>
                    
                    <div className="title-chapters">
                        <h2>Chapters</h2>
                                {chapters.length > 0 ? (
                                    <ul>
                                        {chapters.map((chapter) => (
                                            <li key={chapter.id}>
                                                <Link to={`/chapter/${chapter.id}`}>
                                                    Chapter {chapter.chapter_number}: {chapter.chapter_title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Oops! The chapter list is empty!!.</p>
                                )}
                    </div>

                        </div>
                    ) : (
                        <p>Title not found!</p>
                )}
        </div>
    );
}

export default Title;
