const Cliente = require('../models/Cliente');
const Pet = require('../models/Pet');

const clienteService = {
  listarTodos({ search, sortBy, sortOrder } = {}) {
    return Cliente.findAll({ search, sortBy, sortOrder });
  },


  buscarPorId(id) {
    const cliente = Cliente.findById(id);
    if (!cliente) {
      const error = new Error('Cliente não encontrado');
      error.status = 404;
      throw error;
    }
    return cliente;
  },


  buscarPetsDoCliente(id) {
    const cliente = Cliente.findById(id);
    if (!cliente) {
      const error = new Error('Cliente não encontrado');
      error.status = 404;
      throw error;
    }
    return Pet.findByClienteId(id);
  },


  criar(data) {
    return Cliente.create(data);
  },


  atualizar(id, data) {
    const cliente = Cliente.update(id, data);
    if (!cliente) {
      const error = new Error('Cliente não encontrado');
      error.status = 404;
      throw error;
    }
    return cliente;
  },

  excluir(id, { forcarExclusao = false } = {}) {
    const cliente = Cliente.findById(id);
    if (!cliente) {
      const error = new Error('Cliente não encontrado');
      error.status = 404;
      throw error;
    }

    const pets = Pet.findByClienteId(id);

    if (pets.length > 0 && !forcarExclusao) {
      const error = new Error('Cliente possui pets cadastrados. Envie forcarExclusao=true para confirmar.');
      error.status = 409;
      error.data = { petsCount: pets.length, pets };
      throw error;
    }

    if (pets.length > 0) {
      Pet.deleteByClienteId(id);
    }

    Cliente.delete(id);
    return { message: 'Cliente excluído com sucesso', petsRemovidos: pets.length };
  }
};

module.exports = clienteService;
