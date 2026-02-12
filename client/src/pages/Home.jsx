import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home fade-in">
      <span className="home__badge">
        <span className="home__dot" />
        Sistema de gestão pet
      </span>

      <h1 className="home__title">
        <span>PetAmigo</span> — Cuidando de quem faz parte da família
      </h1>

      <p className="home__sub">
        Organização, praticidade e carinho no cuidado dos seus clientes e pets.
      </p>

      <div className="home__img-wrap">
        <img
          src="/img/passear-com-o-cao.png"
          alt="Pessoa passeando com seu cão"
          className="home__img"
        />
      </div>

      <div className="home__texto">
        <p>
          Na <strong>PetAmigo</strong>, acreditamos que cada pet é único e merece cuidado especial.
          Nosso sistema foi desenvolvido para organizar de forma simples e eficiente o cadastro
          de clientes e seus companheiros de quatro patas, trazendo mais controle, praticidade
          e carinho para o dia a dia da nossa equipe.
        </p>
        <p>
          Com uma interface intuitiva e moderna, a <strong>PetAmigo</strong> facilita o
          gerenciamento de tutores e pets, permitindo um atendimento mais ágil, organizado e humano.
        </p>
      </div>

      <p className="home__signature">
        PetAmigo — tecnologia e cuidado caminhando juntos.
      </p>

      <div className="home__actions">
        <Link to="/clientes" className="home__btn home__btn--primary">
          Ver Clientes
        </Link>
        <Link to="/pets" className="home__btn home__btn--secondary">
          Ver Pets
        </Link>
      </div>
    </div>
  );
}
