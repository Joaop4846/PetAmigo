import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteService from '../services/clienteService';
import petService from '../services/petService';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    Promise.all([
      clienteService.listar(),
      petService.listar()
    ]).then(([clientesRes, petsRes]) => {
      setClientes(clientesRes.data);
      setPets(petsRes.data);
    }).catch(() => { }).finally(() => setLoading(false));
  }, []);



  if (loading) {
    return (
      <div className="dash-loading">
        <div className="spinner" />
        <p>Carregando dados...</p>
      </div>
    );
  }

  const recentes = [
    ...clientes.map(c => ({ tipo: 'cliente', data: c })),
    ...pets.map(p => ({ tipo: 'pet', data: p }))
  ].sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)).slice(0, 5);

  return (
    <div className="dashboard fade-in">
      <div className="dash__top">
        <div>
          <h2 className="dash__titulo">PetAmigo</h2>
          <p className="dash__resumo">
            Você tem <strong onClick={() => navigate('/clientes')}>{clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}</strong> e <strong onClick={() => navigate('/pets')}>{pets.length} {pets.length === 1 ? 'pet' : 'pets'}</strong> cadastrados.
          </p>
        </div>
      </div>


      <div className="dash__recentes">
        <h3 className="dash__recentes-titulo">Cadastros recentes</h3>

        {recentes.length === 0 ? (
          <p className="dash__vazio">Nenhum cadastro ainda. Comece adicionando um cliente.</p>
        ) : (
          <div className="dash__lista">
            {recentes.map(item => (
              <div
                key={item.data.id}
                className="dash__item"
                onClick={() => navigate(item.tipo === 'cliente' ? '/clientes' : '/pets')}
              >
                <span className={`dash__badge dash__badge--${item.tipo}`}>
                  {item.tipo === 'cliente' ? 'Cliente' : 'Pet'}
                </span>
                <div className="dash__item-info">
                  <strong>{item.data.nome}</strong>
                  <span>
                    {item.tipo === 'cliente'
                      ? item.data.email
                      : `${item.data.especie} · ${item.data.raca}`
                    }
                  </span>
                </div>
                <span className="dash__data">
                  {new Date(item.data.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
