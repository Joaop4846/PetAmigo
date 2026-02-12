const Pet = require('../models/Pet');
const Cliente = require('../models/Cliente');

const petService = {
  listarTodos({ search, sortBy, sortOrder } = {}) {
    const pets = Pet.findAll({ search, sortBy, sortOrder });

    return pets.map(pet => {
      const cliente = Cliente.findById(pet.clienteId);
      return { ...pet, cliente: cliente || null };
    });
  },


  buscarPorId(id) {
    const pet = Pet.findById(id);
    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.status = 404;
      throw error;
    }

    const cliente = Cliente.findById(pet.clienteId);
    return { ...pet, cliente: cliente || null };
  },



  criar(data) {
    const cliente = Cliente.findById(data.clienteId);
    if (!cliente) {
      const error = new Error('Tutor (cliente) não encontrado. Todo pet precisa de um tutor.');
      error.status = 400;
      throw error;
    }

    return Pet.create(data);
  },


  atualizar(id, data) {
    if (data.clienteId) {
      const cliente = Cliente.findById(data.clienteId);
      if (!cliente) {
        const error = new Error('Tutor (cliente) não encontrado.');
        error.status = 400;
        throw error;
      }
    }


    const pet = Pet.update(id, data);
    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.status = 404;
      throw error;
    }
    return pet;
  },

  excluir(id) {
    const pet = Pet.findById(id);
    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.status = 404;
      throw error;
    }

    Pet.delete(id);
    return { message: 'Pet excluído com sucesso' };
  }
};

module.exports = petService;
