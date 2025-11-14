import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_checkpoint.png";
import "../../styles/globals.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <img src={logo} alt="Checkpoint Logo" className="footer-logo" />
          <span className="footer-site-name">CHECKPOINT</span>
        </div>

        <nav className="footer-nav">
          <Link to="/" className="footer-link">Início</Link>
          <Link to="/jogos" className="footer-link">Jogos</Link>
          <Link to="/listas" className="footer-link">Listas</Link>
          <Link to="/perfil" className="footer-link">Perfil</Link>
        </nav>

        <div className="footer-copyright">
          <p>&copy; {currentYear} Checkpoint. Todos os direitos reservados.</p>
          <p className="footer-tagline">Sua jornada de jogos começa aqui.</p>
        </div>

      </div>
    </footer>
  );
}
