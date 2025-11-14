// src/pages/Games.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { fetchGames } from '../services/api'; // Você deve criar esta função

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function loadGames() {
    //         const data = await fetchGames(); // Chama sua API (substitui games-data.js)
    //         setGames(data);
    //         setLoading(false);
    //     }
    //     loadGames();
    // }, []);

    if (loading) return <div>Carregando Jogos...</div>; // Substitua por LoadingSpinner.jsx

    return (
        <div className="content container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Todos os Jogos</h1>
            
            {/* O conteúdo da sua seção de busca e filtros (search-section do index.html)
            deve ser transformado em componentes e vir aqui. */}

            <div className="games-grid" id="gamesGrid">
                {/* Mapeia os dados da API para GameCard.jsx (seu game-card) */}
                {games.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id} className="game-card">
                        {/* Conteúdo do GameCard.jsx */}
                        <p>{game.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}