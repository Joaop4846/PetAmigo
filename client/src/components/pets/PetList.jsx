import PetCard from './PetCard';
import './PetList.css';

export default function PetList({ pets, onEdit, onDelete }) {
  if (pets.length === 0) {
    return (
      <div className="empty fade-in">
        <img src="/img/pegadas-de-cachorro.png" alt="" className="empty__icon" />
        <h3 className="empty__titulo">Nenhum pet encontrado</h3>
        <p className="empty__texto">Cadastre o primeiro pet para começar</p>
      </div>
    );
  }

  return (
    <div className="pet-list">
      {pets.map(pet => (
        <PetCard
          key={pet.id}
          pet={pet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
