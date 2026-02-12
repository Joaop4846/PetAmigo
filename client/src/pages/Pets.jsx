import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import PetList from '../components/pets/PetList';
import PetForm from '../components/pets/PetForm';
import useFetch from '../hooks/useFetch';
import petService from '../services/petService';
import '../components/layout/Toolbar.css';

export default function Pets() {
  const location = useLocation();
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('asc');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [paraExcluir, setParaExcluir] = useState(null);
  const [clientePreId, setClientePreId] = useState(null);


  const buscarPets = useCallback((params) => petService.listar(params), []);
  const { data: pets, loading, reload } = useFetch(buscarPets, { search: busca, sortBy: 'nome', sortOrder: ordem });


  useEffect(() => {
    if (location.state?.addPetForCliente) {
      setClientePreId(location.state.addPetForCliente);
      setEditando(null);
      setMostrarForm(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  async function salvarNovo(data) {
    await petService.criar(data);
    setMostrarForm(false);
    setClientePreId(null);
    reload();
  }


  async function salvarEdicao(data) {
    await petService.atualizar(editando.id, data);
    setEditando(null);
    reload();
  }

  async function confirmarExclusao() {
    await petService.excluir(paraExcluir.id);
    setParaExcluir(null);
    reload();
  }

  function abrirEdicao(pet) {
    setEditando(pet);
    setClientePreId(null);
    setMostrarForm(true);
  }

  function abrirNovo() {
    setEditando(null);
    setClientePreId(null);
    setMostrarForm(true);
  }

  return (
    <div className="pg-pets fade-in">
      <Header title="Pets" subtitle={`${pets.length} pets cadastrados`}>
        <Button onClick={abrirNovo}>+ Novo pet</Button>
      </Header>

      <div className="toolbar">
        <div className="toolbar__search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="toolbar__input"
          />
        </div>


        <div className="toolbar__sort">
          <button
            className={`toolbar__sort-opt ${ordem === 'asc' ? 'toolbar__sort-opt--active' : ''}`}
            onClick={() => setOrdem('asc')}
          >
            A-Z
          </button>
          <button
            className={`toolbar__sort-opt ${ordem === 'desc' ? 'toolbar__sort-opt--active' : ''}`}
            onClick={() => setOrdem('desc')}
          >
            Z-A
          </button>
        </div>
      </div>


      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Carregando pets...</p>
        </div>
      ) : (
        <PetList
          pets={pets}
          onEdit={abrirEdicao}
          onDelete={p => setParaExcluir(p)}
        />
      )}


      <Modal
        isOpen={mostrarForm}
        onClose={() => { setMostrarForm(false); setEditando(null); setClientePreId(null); }}
        title={editando ? 'Editar pet' : 'Novo pet'}
      >
        <PetForm
          pet={editando}
          preSelectedClienteId={clientePreId}
          onSubmit={editando ? salvarEdicao : salvarNovo}
          onCancel={() => { setMostrarForm(false); setEditando(null); setClientePreId(null); }}
        />
      </Modal>


      <ConfirmDialog
        isOpen={!!paraExcluir}
        onClose={() => setParaExcluir(null)}
        onConfirm={confirmarExclusao}
        title="Excluir pet"
        message={`Tem certeza que deseja excluir ${paraExcluir?.nome}?`}
      />
    </div>
  );
}
