import React, { useState, useEffect } from "react";
import axios from "axios";
import MangaCard from "../components/MangaCard";
import "../styles/categoryView.css";

function Mangas() {
    const [mangas, setMangas] = useState([]); // Lista original
    const [filteredMangas, setFilteredMangas] = useState([]); // Lista filtrada
    const [search, setSearch] = useState(""); // Estado para el input de búsqueda

    // Obtener la lista de mangas
    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/mangas');
                setMangas(response.data);
                setFilteredMangas(response.data); // Inicializar la lista filtrada
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMangas();
    }, []);

    // Filtrar en tiempo real
    useEffect(() => {
        setFilteredMangas(
            mangas.filter(manga =>
                manga.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, mangas]);

    return (
        <div className="manga-global">
            <div className="manga-section">
                <h1>Manga</h1>
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
                <MangaCard mangas={filteredMangas} /> {/* Pasar mangas filtrados */}
            </div>
        </div>
    );
}

export default Mangas;
