import React, { useState, useEffect } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import "../styles/categoryView.css";

function Comics() {
    const [comics, setComics] = useState([]); // Lista original
    const [filteredComics, setFilteredComics] = useState([]); // Lista filtrada
    const [search, setSearch] = useState(""); // Estado para el input de búsqueda

    // Obtener la lista de cómics
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/comics');
                setComics(response.data);
                setFilteredComics(response.data); // Inicializar la lista filtrada
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchComics();
    }, []);

    // Filtrar en tiempo real
    useEffect(() => {
        setFilteredComics(
            comics.filter(comic =>
                comic.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, comics]);

    return (
        <div className="manga-global">
            <div className="manga-section">
                <h1>Comics</h1>
                <div className="manga-filters">
                    <h3>Filter</h3>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
                    />
                </div>
            </div>
            <div className="manga-list">
                <ComicCard comics={filteredComics} /> {/* Pasar cómics filtrados */}
            </div>
        </div>
    );
}

export default Comics;
