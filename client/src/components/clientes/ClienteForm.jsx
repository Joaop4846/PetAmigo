import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './ClienteForm.css';

const initialState = { nome: '', email: '', telefone: '' };

export default function ClienteForm({ cliente, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cliente) {
      setForm({ nome: cliente.nome, email: cliente.email, telefone: cliente.telefone });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [cliente]);


  function validate() {
    const errs = {};
    if (!form.nome.trim() || form.nome.trim().length < 2) errs.nome = 'Nome deve ter pelo menos 2 caracteres';
    if (!form.email.trim()) errs.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
    if (!form.telefone.trim() || form.telefone.trim().length < 8) errs.telefone = 'Telefone deve ter pelo menos 8 caracteres';
    return errs;
  }



  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm(initialState);
      setErrors({});
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        setErrors({ server: serverErrors.join(', ') });
      }
    } finally {
      setSubmitting(false);
    }
  }



  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }




  return (
    <form className="form-cliente" onSubmit={handleSubmit}>
      <Input
        id="nome"
        label="Nome completo"
        placeholder="Ex: Maria Silva"
        value={form.nome}
        onChange={e => handleChange('nome', e.target.value)}
        error={errors.nome}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Ex: maria@email.com"
        value={form.email}
        onChange={e => handleChange('email', e.target.value)}
        error={errors.email}
      />

      <Input
        id="telefone"
        label="Telefone"
        placeholder="Ex: (11) 99999-0000"
        value={form.telefone}
        onChange={e => handleChange('telefone', e.target.value)}
        error={errors.telefone}
      />


      {errors.server && <p className="form-cliente__erro">{errors.server}</p>}


      <div className="form-cliente__acoes">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : cliente ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
}
