import { Link } from "react-router";
import { Clapperboard, BookMarked, UserRound } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <Clapperboard size={22} strokeWidth={2} />
          <span>CineDiário</span>
        </Link>
        <nav className="navbar__links">
          <Link to="/diario" className="navbar__link">
            <BookMarked size={18} />
            <span>Meu diário</span>
          </Link>
          <Link to="/perfil" className="navbar__link">
            <UserRound size={18} />
            <span>Perfil</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
