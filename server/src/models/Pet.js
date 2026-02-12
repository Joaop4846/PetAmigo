const db = require('../config/database');

const COLLECTION = 'pets';

const Pet = {
  findAll(options = {}) {
    return db.findAll(COLLECTION, {
      search: options.search,
      searchField: 'nome',
      sortBy: options.sortBy || 'nome',
      sortOrder: options.sortOrder || 'asc',
      filter: options.filter
    });
  },

  findById(id) {
    return db.findById(COLLECTION, id);
  },

  findByClienteId(clienteId) {
    return db.findAll(COLLECTION, {
      filter: { clienteId }
    });
  },

  create(data) {
    return db.create(COLLECTION, {
      nome: data.nome,
      especie: data.especie,
      raca: data.raca,
      idade: data.idade,
      clienteId: data.clienteId,
      imagem: data.imagem || null
    });
  },

  update(id, data) {
    return db.update(COLLECTION, id, {
      nome: data.nome,
      especie: data.especie,
      raca: data.raca,
      idade: data.idade,
      clienteId: data.clienteId,
      imagem: data.imagem || null
    });
  },

  delete(id) {
    return db.delete(COLLECTION, id);
  },

  deleteByClienteId(clienteId) {
    return db.deleteMany(COLLECTION, { clienteId });
  }
};

module.exports = Pet;
