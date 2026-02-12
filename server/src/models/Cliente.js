const db = require('../config/database');

const COLLECTION = 'clientes';

const Cliente = {
  findAll(options = {}) {
    return db.findAll(COLLECTION, {
      search: options.search,
      searchField: 'nome',
      sortBy: options.sortBy || 'nome',
      sortOrder: options.sortOrder || 'asc'
    });
  },

  findById(id) {
    return db.findById(COLLECTION, id);
  },

  create(data) {
    return db.create(COLLECTION, {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone
    });
  },

  update(id, data) {
    return db.update(COLLECTION, id, {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone
    });
  },

  delete(id) {
    return db.delete(COLLECTION, id);
  }
};

module.exports = Cliente;
