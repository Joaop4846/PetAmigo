const petService = require('../services/petService');

const petController = {
  async listar(req, res, next) {
    try {
      const { search, sortBy, sortOrder } = req.query;
      const pets = petService.listarTodos({ search, sortBy, sortOrder });
      res.json(pets);
    } catch (err) {
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const pet = petService.buscarPorId(req.params.id);
      res.json(pet);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const pet = petService.criar(req.body);
      res.status(201).json(pet);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const pet = petService.atualizar(req.params.id, req.body);
      res.json(pet);
    } catch (err) {
      next(err);
    }
  },

  async excluir(req, res, next) {
    try {
      const resultado = petService.excluir(req.params.id);
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = petController;
