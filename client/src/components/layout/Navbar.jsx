import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar__content">
        <NavLink to="/" className="navbar__brand">
          <img src="/img/cachorro.png" alt="PetAmigo" className="navbar__logo" />
          <h1 className="navbar__title">PetAmigo</h1>
        </NavLink>


        <nav className="navbar__nav">
          <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`} end>
            <img src="/img/home.png" alt="Home" className="navbar__icon" />
            <span>Home</span>
          </NavLink>


          <NavLink to="/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <img src="/img/grafico-simples.svg" alt="Dashboard" className="navbar__icon" />
            <span>Dashboard</span>
          </NavLink>


          <NavLink to="/clientes" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <img src="/img/client.svg" alt="Clientes" className="navbar__icon" />
            <span>Clientes</span>
          </NavLink>


          <NavLink to="/pets" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            <img src="/img/cachorro-na-coleira.svg" alt="Pets" className="navbar__icon" />
            <span>Pets</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
