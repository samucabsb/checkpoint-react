import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo_checkpoint.png";
import "../../styles/globals.css";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="topbar">
      <div className="logo-container">
        <img src={logo} alt="Checkpoint Logo" className="logo-img" />
        <span className="site-name">CHECKPOINT</span>
      </div>

      <nav className="nav-container">
        <Link
          to="/"
          className={`nav-btn ${isActive("/") ? "active" : ""}`}
        >
          Início
        </Link>

        <Link
          to="/jogos"
          className={`nav-btn ${isActive("/jogos") ? "active" : ""}`}
        >
          Jogos
        </Link>

        <Link
          to="/listas"
          className={`nav-btn ${isActive("/listas") ? "active" : ""}`}
        >
          Listas
        </Link>

        <Link
          to="/perfil"
          className={`nav-btn ${isActive("/perfil") ? "active" : ""}`}
        >
          Perfil
        </Link>
      </nav>
    </header>
  );
}
