import api from './api';

const petService = {
  listar(params = {}) {
    return api.get('/pets', { params });
  },

  buscarPorId(id) {
    return api.get(`/pets/${id}`);
  },

  criar(data) {
    return api.post('/pets', data);
  },

  atualizar(id, data) {
    return api.put(`/pets/${id}`, data);
  },

  excluir(id) {
    return api.delete(`/pets/${id}`);
  }
};

export default petService;
