function validarCliente(req, res, next) {
  const { nome, email, telefone } = req.body;
  const errors = [];

  if (!nome || nome.trim().length < 2) {
    errors.push('Nome é obrigatório e deve ter pelo menos 2 caracteres');
  }

  if (!email || !email.trim()) {
    errors.push('Email é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email inválido');
  }

  if (!telefone || telefone.trim().length < 8) {
    errors.push('Telefone é obrigatório e deve ter pelo menos 8 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Dados inválidos', errors });
  }

  next();
}

function validarPet(req, res, next) {
  const { nome, especie, raca, idade, clienteId } = req.body;
  const errors = [];

  if (!nome || nome.trim().length < 1) {
    errors.push('Nome do pet é obrigatório');
  }

  if (!especie || especie.trim().length < 1) {
    errors.push('Espécie é obrigatória');
  }

  if (!raca || raca.trim().length < 1) {
    errors.push('Raça é obrigatória');
  }

  if (idade === undefined || idade === null || idade === '') {
    errors.push('Idade é obrigatória');
  } else if (isNaN(Number(idade)) || Number(idade) < 0) {
    errors.push('Idade deve ser um número válido');
  }

  if (!clienteId) {
    errors.push('Todo pet precisa de um tutor (clienteId)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Dados inválidos', errors });
  }

  next();
}

module.exports = { validarCliente, validarPet };
