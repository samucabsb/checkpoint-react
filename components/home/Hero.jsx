export default function Hero() {
  return (
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
          <a href="/jogos" className="hero-btn hero-btn-primary">Explorar Jogos</a>
          <a href="/perfil" className="hero-btn hero-btn-secondary">Fazer Login</a>
        </div>
      </div>
    </section>
  );
}
