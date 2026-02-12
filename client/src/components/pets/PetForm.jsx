import { useState, useEffect, useRef } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import clienteService from '../../services/clienteService';
import './PetForm.css';

const initialState = { nome: '', especie: '', raca: '', idade: '', clienteId: '', imagem: '' };



export default function PetForm({ pet, preSelectedClienteId, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [erros, setErros] = useState({});
  const [clientes, setClientes] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const fileInputRef = useRef(null);


  useEffect(() => {
    clienteService.listar().then(res => setClientes(res.data)).catch(() => { });
  }, []);


  useEffect(() => {
    if (pet) {
      setForm({
        nome: pet.nome,
        especie: pet.especie,
        raca: pet.raca,
        idade: String(pet.idade),
        clienteId: pet.clienteId,
        imagem: pet.imagem || ''
      });
    } else if (preSelectedClienteId) {
      setForm(prev => ({ ...prev, clienteId: preSelectedClienteId }));
    } else {
      setForm(initialState);
    }
    setErros({});
  }, [pet, preSelectedClienteId]);



  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.especie.trim()) e.especie = 'Espécie é obrigatória';
    if (!form.raca.trim()) e.raca = 'Raça é obrigatória';
    if (!form.idade || isNaN(Number(form.idade)) || Number(form.idade) < 0) e.idade = 'Idade inválida';
    if (!form.clienteId) e.clienteId = 'Selecione um tutor';
    return e;
  }


  async function aoSubmeter(e) {
    e.preventDefault();
    const e2 = validar();
    if (Object.keys(e2).length > 0) {
      setErros(e2);
      return;
    }
    setSalvando(true);
    try {
      await onSubmit({ ...form, idade: Number(form.idade) });
      setForm(initialState);
      setErros({});
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        setErros({ server: serverErrors.join(', ') });
      } else {
        setErros({ server: err.response?.data?.message || 'Erro ao salvar' });
      }
    } finally {
      setSalvando(false);
    }
  }


  function aoMudar(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (erros[field]) setErros(prev => ({ ...prev, [field]: undefined }));
  }

  function processarImagem(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErros(prev => ({ ...prev, imagem: 'Selecione um arquivo de imagem válido' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErros(prev => ({ ...prev, imagem: 'Imagem deve ter no máximo 5MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setForm(prev => ({ ...prev, imagem: e.target.result }));
      setErros(prev => ({ ...prev, imagem: undefined }));
    };
    reader.readAsDataURL(file);
  }


  function aoSoltar(e) {
    e.preventDefault();
    setArrastando(false);
    const file = e.dataTransfer.files[0];
    processarImagem(file);
  }

  function aoArrastar(e) {
    e.preventDefault();
    setArrastando(true);
  }

  function aoSairArrasto() {
    setArrastando(false);
  }

  function removerImagem() {
    setForm(prev => ({ ...prev, imagem: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }



  return (
    <form className="pet-form" onSubmit={aoSubmeter}>
      <div
        className={`pet-form__upload ${arrastando ? 'pet-form__upload--drag' : ''} ${form.imagem ? 'pet-form__upload--filled' : ''}`}
        onDrop={aoSoltar}
        onDragOver={aoArrastar}
        onDragLeave={aoSairArrasto}
        onClick={() => !form.imagem && fileInputRef.current?.click()}
      >
        {form.imagem ? (
          <div className="pet-form__preview">
            <img src={form.imagem} alt="Preview" />
            <button type="button" className="pet-form__remove" onClick={(e) => { e.stopPropagation(); removerImagem(); }} title="Remover imagem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

        ) : (

          <div className="pet-form__dropzone">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Clique ou arraste uma foto do pet</span>
            <span className="pet-form__dica">JPG, PNG ou WebP • Máx 5MB</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="pet-form__file"
          onChange={e => processarImagem(e.target.files[0])}
        />
      </div>

      {erros.imagem && <span className="pet-form__error">{erros.imagem}</span>}

      <Input
        id="pet-nome"
        label="Nome do pet"
        placeholder="Ex: Rex"
        value={form.nome}
        onChange={e => aoMudar('nome', e.target.value)}
        error={erros.nome}
      />

      <div className="pet-form__row">
        <Input
          id="pet-especie"
          label="Espécie"
          placeholder="Ex: Cachorro"
          value={form.especie}
          onChange={e => aoMudar('especie', e.target.value)}
          error={erros.especie}
        />

        <Input
          id="pet-raca"
          label="Raça"
          placeholder="Ex: Labrador"
          value={form.raca}
          onChange={e => aoMudar('raca', e.target.value)}
          error={erros.raca}
        />
      </div>


      <div className="pet-form__row">
        <Input
          id="pet-idade"
          label="Idade (anos)"
          type="number"
          min="0"
          placeholder="Ex: 3"
          value={form.idade}
          onChange={e => aoMudar('idade', e.target.value)}
          error={erros.idade}
        />

        <div className={`input-group ${erros.clienteId ? 'input-group--error' : ''}`}>
          <label htmlFor="pet-cliente" className="input-group__label">Tutor</label>
          <select
            id="pet-cliente"
            className="input-group__field"
            value={form.clienteId}
            onChange={e => aoMudar('clienteId', e.target.value)}
          >
            <option value="">Selecione o tutor</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
          {erros.clienteId && <span className="input-group__error">{erros.clienteId}</span>}
        </div>
      </div>

      {erros.server && <p className="pet-form__erro">{erros.server}</p>}

      <div className="pet-form__actions">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : pet ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
}
