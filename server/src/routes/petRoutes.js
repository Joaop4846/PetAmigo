const { Router } = require('express');
const petController = require('../controllers/petController');
const { validarPet } = require('../middlewares/validation');

const router = Router();

router.get('/', petController.listar);
router.get('/:id', petController.buscarPorId);
router.post('/', validarPet, petController.criar);
router.put('/:id', validarPet, petController.atualizar);
router.delete('/:id', petController.excluir);

module.exports = router;
