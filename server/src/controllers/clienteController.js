const clienteService = require('../services/clienteService');

const clienteController = {
  async listar(req, res, next) {
    try {
      const { search, sortBy, sortOrder } = req.query;
      const clientes = clienteService.listarTodos({ search, sortBy, sortOrder });
      res.json(clientes);
    } catch (err) {
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const cliente = clienteService.buscarPorId(req.params.id);
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  async buscarPets(req, res, next) {
    try {
      const pets = clienteService.buscarPetsDoCliente(req.params.id);
      res.json(pets);
    } catch (err) {
      next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const cliente = clienteService.criar(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const cliente = clienteService.atualizar(req.params.id, req.body);
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  async excluir(req, res, next) {
    try {
      const { forcarExclusao } = req.query;
      const resultado = clienteService.excluir(req.params.id, {
        forcarExclusao: forcarExclusao === 'true'
      });
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = clienteController;
