import api from './api';

const clienteService = {
  listar(params = {}) {
    return api.get('/clientes', { params });
  },

  buscarPorId(id) {
    return api.get(`/clientes/${id}`);
  },

  buscarPets(id) {
    return api.get(`/clientes/${id}/pets`);
  },

  criar(data) {
    return api.post('/clientes', data);
  },

  atualizar(id, data) {
    return api.put(`/clientes/${id}`, data);
  },

  excluir(id, forcarExclusao = false) {
    return api.delete(`/clientes/${id}`, {
      params: { forcarExclusao: forcarExclusao ? 'true' : undefined }
    });
  }
};

export default clienteService;
