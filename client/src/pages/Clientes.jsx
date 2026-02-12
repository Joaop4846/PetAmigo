import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ClienteList from '../components/clientes/ClienteList';
import ClienteForm from '../components/clientes/ClienteForm';
import ClienteDetalhe from '../components/clientes/ClienteDetalhe';
import useFetch from '../hooks/useFetch';
import clienteService from '../services/clienteService';
import '../components/layout/Toolbar.css';

export default function Clientes() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('asc');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [selecionado, setSelecionado] = useState(null);
  const [paraExcluir, setParaExcluir] = useState(null);
  const [temPets, setTemPets] = useState(false);


  const buscarClientes = useCallback((params) => clienteService.listar(params), []);
  const { data: clientes, loading, reload } = useFetch(buscarClientes, { search: busca, sortBy: 'nome', sortOrder: ordem });


  async function salvarNovo(data) {
    await clienteService.criar(data);
    setMostrarForm(false);
    reload();
  }

  async function salvarEdicao(data) {
    await clienteService.atualizar(editando.id, data);
    setEditando(null);
    reload();
  }

  async function confirmarExclusao() {
    try {
      await clienteService.excluir(paraExcluir.id, temPets);
      setParaExcluir(null);
      setTemPets(false);
      reload();
    } catch (err) {
      if (err.response?.status === 409) {
        setTemPets(true);
      }
    }
  }


  function abrirEdicao(cliente) {
    setEditando(cliente);
    setMostrarForm(true);
  }


  function abrirNovo() {
    setEditando(null);
    setMostrarForm(true);
  }

  function adicionarPet(cliente) {
    setSelecionado(null);
    navigate('/pets', { state: { addPetForCliente: cliente.id } });
  }

  return (
    <div className="pg-clientes fade-in">
      <Header title="Clientes" subtitle={`${clientes.length} clientes cadastrados`}>
        <Button onClick={abrirNovo}>+ Novo cliente</Button>
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
          <p>Carregando clientes...</p>
        </div>
      ) : (
        <ClienteList
          clientes={clientes}
          onEdit={abrirEdicao}
          onDelete={c => { setParaExcluir(c); setTemPets(false); }}
          onView={c => setSelecionado(c)}
        />
      )}

      <Modal
        isOpen={mostrarForm}
        onClose={() => { setMostrarForm(false); setEditando(null); }}
        title={editando ? 'Editar cliente' : 'Novo cliente'}
      >
        <ClienteForm
          cliente={editando}
          onSubmit={editando ? salvarEdicao : salvarNovo}
          onCancel={() => { setMostrarForm(false); setEditando(null); }}
        />
      </Modal>

      <Modal
        isOpen={!!selecionado}
        onClose={() => setSelecionado(null)}
        title={selecionado?.nome}
        size="md"
      >
        {selecionado && (
          <ClienteDetalhe
            cliente={selecionado}
            onClose={() => setSelecionado(null)}
            onAddPet={adicionarPet}
          />
        )}
      </Modal>


      <ConfirmDialog
        isOpen={!!paraExcluir}
        onClose={() => { setParaExcluir(null); setTemPets(false); }}
        onConfirm={confirmarExclusao}
        title="Excluir cliente"
        message={
          temPets
            ? `${paraExcluir?.nome} possui pets cadastrados. Ao excluir, todos os pets também serão removidos. Deseja continuar?`
            : `Tem certeza que deseja excluir ${paraExcluir?.nome}?`
        }
        confirmLabel={temPets ? 'Excluir tudo' : 'Excluir'}
      />
    </div>
  );
}
