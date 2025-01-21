import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Title() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [manga, setManga] = useState(null); // Almacena los datos del cómic
    const [loading, setLoading] = useState(true); // Estado de carga

    // Obtén el ID del cómic desde los parámetros de la URL
    const mangaId = searchParams.get('id');

    // useEffect para cargar los datos del cómic cuando cambia el ID
    useEffect(() => {
        const fetchManga = async () => {
            if (mangaId) {
                setLoading(true); // Comienza el estado de carga
                try {
                    const response = await axios.get(`http://localhost:5000/api/titles?id=${mangaId}`);
                    setManga(response.data); // Actualiza los datos del cómic
                } catch (error) {
                    console.error('Error al obtener los datos del cómic:', error);
                } finally {
                    setLoading(false); // Finaliza la carga
                }
            }
        };

        fetchManga();
    }, [mangaId]); // Se ejecuta cada vez que cambia el ID del cómic

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : manga ? (
                <div>
                    <h1>{manga.title}</h1>
                    <p><strong>Autor:</strong> {manga.author}</p>
                    <p><strong>Género:</strong> {manga.genre}</p>
                    <p><strong>Sinopsis:</strong> {manga.synopsis}</p>
                    <img 
                        src={manga.cover}
                        alt={manga.title}
                    />
                </div>
            ) : (
                <p>No se encontró el cómic.</p>
            )}

            <button onClick={() => setSearchParams({ id: '2' })}>Ir al Cómic 2</button>
        </div>
    );
}

export default Title;
