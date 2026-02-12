const { Router } = require('express');
const clienteController = require('../controllers/clienteController');
const { validarCliente } = require('../middlewares/validation');

const router = Router();

router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId);
router.get('/:id/pets', clienteController.buscarPets);
router.post('/', validarCliente, clienteController.criar);
router.put('/:id', validarCliente, clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;
