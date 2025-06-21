const express = require('express');
const alimentosController = require('./controllers/alimentosController');
const router = express.Router();

router.get('/alimentos', alimentosController.getAlimentos);
router.post('/alimentos', alimentosController.criarAlimento);
router.put('/alimentos/:id', alimentosController.atualizarAlimento);
router.delete('/alimentos/:id', alimentosController.deletarAlimento);

router.get('/usuarios', alimentosController.getUsuarios);
router.post('/usuarios', alimentosController.criarUsuario);
router.put('/usuario/:id', alimentosController.atualizarUsuario);
router.delete('/usuario/:id', alimentosController.deletarUsuario);

module.exports = router;

