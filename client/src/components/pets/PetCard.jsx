import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/Button';
import './PetCard.css';


export default function PetCard({ pet, onEdit, onDelete }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);


  const imgPadrao = pet.especie?.toLowerCase() === 'gato' ? '/img/gato.png' : '/img/dog.png';


  return (
    <>
      <div className="pet-card fade-in">
        {pet.imagem ? (
          <div className="pet-card__icon" onClick={() => setLightboxOpen(true)} title="Clique para ampliar">
            <img src={pet.imagem} alt={pet.nome} className="pet-card__img" />
          </div>

        ) : (
          <div className="pet-card__placeholder">
            <img src={imgPadrao} alt={pet.especie} className="pet-card__img" />
          </div>
        )}

        <div className="pet-card__info">
          <h4 className="pet-card__name">{pet.nome}</h4>
          <div className="pet-card__tags">
            <span className="pet-card__tag">{pet.especie}</span>
            <span className="pet-card__tag">{pet.raca}</span>
            <span className="pet-card__tag">{pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}</span>
          </div>

          {pet.cliente && (
            <p className="pet-card__tutor">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {pet.cliente.nome}
            </p>
          )}
        </div>

        <div className="pet-card__actions">
          <Button variant="icon" size="sm" onClick={() => onEdit(pet)} title="Editar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Button>

          <Button variant="icon" size="sm" onClick={() => onDelete(pet)} title="Excluir">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
        </div>
      </div>

      {lightboxOpen && pet.imagem && createPortal(
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox__close" onClick={() => setLightboxOpen(false)} aria-label="Fechar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <img src={pet.imagem} alt={pet.nome} className="lightbox__img" onClick={e => e.stopPropagation()} />
        </div>,
        document.body
      )}
    </>
  );
}
