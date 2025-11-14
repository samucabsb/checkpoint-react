import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/home.css";

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [activity, setActivity] = useState([]);

  // =============================
  // 1) Buscar JOGOS EM DESTAQUE
  // =============================
  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.get("/jogos");
        // ordenar por nota quando isso existir ― por enquanto, só pegar 4
        setFeaturedGames(res.data.slice(0, 4));
      } catch (e) {
        console.error("Erro ao carregar jogos", e);
      }
    }
    loadFeatured();
  }, []);

  // =============================
  // 2) Buscar ATIVIDADE RECENTE
  // =============================
  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await api.get("/avaliacoes");
        const latest = res.data.slice(0, 6); // pegar últimas 6
        setActivity(latest);
      } catch (e) {
        console.error("Erro ao carregar atividade", e);
      }
    }
    loadActivity();
  }, []);

  return (
    <div className="home-wrapper">

      {/* ============================
          HERO SECTION
      ============================ */}
      <section className="hero-section">
        <div className="hero-background"></div>

        <div className="hero-content">
          <span className="hero-badge">🎮 Sua jornada começa aqui</span>

          <div className="hero-multiline">
            <p>Acompanhe jogos que você jogou.</p>
            <p>Salve aqueles que você quer jogar.</p>
            <p>Fale para seus amigos qual o melhor.</p>
          </div>

          <p className="hero-subtitle">
            Junte-se à comunidade de gamers apaixonados e descubra novos mundos!
          </p>

          <div className="hero-buttons">
            <Link to="/jogos" className="hero-btn hero-btn-primary">
              Explorar Jogos
            </Link>

            <Link to="/perfil" className="hero-btn hero-btn-secondary">
              Fazer Login
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          JOGOS EM DESTAQUE
      ============================ */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Jogos em Destaque</h2>
          <p className="section-subtitle">Os títulos mais populares da comunidade</p>
        </div>

        <div className="featured-carousel">
          {featuredGames.map((game) => (
            <Link
              key={game.id_jogo}
              to={`/jogos/${game.id_jogo}`}
              className="featured-card"
            >
              <img
                className="featured-card-image"
                src={`${import.meta.env.VITE_API_URL}/jogos/${game.id_jogo}/imagem`}
                alt={game.nm_jogo}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x800/001a14/ffffff?text=Sem+Imagem";
                }}
              />

              <div className="featured-card-overlay">
                <span className="featured-card-genre">{game.genero}</span>

                <h3 className="featured-card-title">{game.nm_jogo}</h3>

                <div className="featured-card-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span>4.8</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================
          ATIVIDADE RECENTE
      ============================ */}
      <section className="activity-section">
        <div className="section-header">
          <h2 className="section-title">Atividade Recente</h2>
          <p className="section-subtitle">Veja o que a comunidade está fazendo</p>
        </div>

        <div className="activity-list">
          {activity.map((item) => (
            <div key={item.id_avaliacao} className="activity-card">
              <div className="activity-user">
                <div className="activity-avatar">🎮</div>
                <span className="activity-username">{item.nm_usuario ?? "Usuário"}</span>
              </div>

              <p className="activity-action">
                Avaliou{" "}
                <span className="activity-game">{item.id_jogo}</span> com{" "}
                {item.nota} ⭐
              </p>

              <span className="activity-timestamp">
                {new Date(item.data_avaliacao).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))}

          {/* Caso ainda não tenha atividade */}
          {activity.length === 0 && (
            <>
              <div className="activity-card">
                <div className="activity-user">
                  <div className="activity-avatar">👤</div>
                  <span className="activity-username">User123</span>
                </div>
                <p className="activity-action">
                  Avaliou <span className="activity-game">Elden Ring</span> com 5 estrelas!
                </p>
                <span className="activity-timestamp">Há 2 horas</span>
              </div>

              <div className="activity-card">
                <div className="activity-user">
                  <div className="activity-avatar">🎮</div>
                  <span className="activity-username">GamerPro</span>
                </div>
                <p className="activity-action">
                  Adicionou <span className="activity-game">God of War</span> à lista de desejos.
                </p>
                <span className="activity-timestamp">Há 5 horas</span>
              </div>
            </>
          )}
        </div>

        <button className="view-more-btn">Ver Atividade Completa</button>
      </section>
    </div>
  );
}
