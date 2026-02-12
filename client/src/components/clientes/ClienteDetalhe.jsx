import { useState, useEffect } from 'react';
import clienteService from '../../services/clienteService';
import Button from '../ui/Button';
import './ClienteDetalhe.css';

export default function ClienteDetalhe({ cliente, onClose, onAddPet }) {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);



  useEffect(() => {
    if (cliente?.id) {
      setCarregando(true);
      clienteService.buscarPets(cliente.id)
        .then(res => setPets(res.data))
        .catch(() => setPets([]))
        .finally(() => setCarregando(false));
    }
  }, [cliente?.id]);

  return (
    <div className="cliente-detalhe">
      <div className="detalhe__info">
        <div className="detalhe__row">
          <span className="detalhe__label">Email</span>
          <span>{cliente.email}</span>
        </div>
        <div className="detalhe__row">
          <span className="detalhe__label">Telefone</span>
          <span>{cliente.telefone}</span>
        </div>
        <div className="detalhe__row">
          <span className="detalhe__label">Cadastrado em</span>
          <span>{new Date(cliente.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="cliente-detalhe__pets">
        <div className="detalhe__header">
          <h4>Pets ({pets.length})</h4>
          <Button variant="ghost" size="sm" onClick={() => onAddPet(cliente)}>
            + Adicionar pet
          </Button>
        </div>

        {carregando ? (
          <p className="detalhe__loading">Carregando pets...</p>
        ) : pets.length === 0 ? (
          <p className="detalhe__vazio">Nenhum pet cadastrado</p>
        ) : (
          <div className="detalhe__lista">
            {pets.map(pet => (
              <div key={pet.id} className="detalhe__pet">
                <span className="detalhe__pet-icon">
                  <img
                    src={pet.imagem || (pet.especie?.toLowerCase() === 'gato' ? '/img/gato.png' : '/img/dog.png')}
                    alt={pet.especie}
                    className="detalhe__img"
                  />
                </span>
                <div>
                  <strong>{pet.nome}</strong>
                  <span className="detalhe__pet-sub">
                    {pet.especie} · {pet.raca} · {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



      <div className="detalhe__footer">
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
      </div>
    </div>
  );
}
