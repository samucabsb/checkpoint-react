// src/components/home/FeaturedSection.jsx
import { useEffect, useState } from "react";
import { getJogos, getJogoImagemUrl } from "../../services/jogosService";

export default function FeaturedSection() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getJogos(); // pega todos os jogos
        if (!mounted) return;
        // Pegar os 4 primeiros como "destaque" (ajuste conforme backend)
        setGames(data.slice(0, 4));
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar jogos.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Jogos em Destaque</h2>
        </div>
        <p className="section-subtitle">Carregando...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Jogos em Destaque</h2>
        </div>
        <p className="section-subtitle text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2 className="section-title">Jogos em Destaque</h2>
        <p className="section-subtitle">Os títulos mais populares da comunidade</p>
      </div>

      <div className="featured-carousel">
        {games.map((g) => {
          const imgUrl = g.tem_imagem ? getJogoImagemUrl(g.id_jogo) : g.img || "";
          return (
            <a key={g.id_jogo} href={`/game/${g.id_jogo}`} className="featured-card">
              <img src={imgUrl} alt={g.nm_jogo} className="featured-card-image" />
              <div className="featured-card-overlay">
                <span className="featured-card-genre">{g.genero}</span>
                <h3 className="featured-card-title">{g.nm_jogo}</h3>
                <div className="featured-card-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span>{/* se você tiver nota média no objeto colocar aqui */}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
