const express = require('express');
const alimentosController = require('./controllers/alimentosController');
const router = express.Router();

router.get('/alimentos', alimentosController.getAlimentos);
router.post('/alimentos', alimentosController.criarAlimento);
router.put('/alimentos/:id', alimentosController.atualizarAlimento);
router.delete('/alimentos/:id', alimentosController.deletarAlimento);

router.get('/usuarios', usuariosController.getUsuarios);
router.post('/usuarios', usuariosController.criarUsuario);
router.put('/usuario/:id', usuariosController.atualizarUsuario);
router.delete('/usuario/:id', usuariosController.deletarUsuario);



module.exports = router;

