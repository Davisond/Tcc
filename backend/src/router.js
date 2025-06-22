const express = require('express');
const alimentosController = require('./controllers/alimentosController');
const usuariosController = require('./controllers/usuariosController');
const diaController = require('./controllers/diaController');
const router = express.Router();

router.get('/alimentos', alimentosController.getAlimentos);
router.get('/alimentos/:id', alimentosController.getAlimentoById);
router.post('/alimentos', alimentosController.criarAlimento);
router.put('/alimentos/:id', alimentosController.atualizarAlimento);
router.delete('/alimentos/:id', alimentosController.deletarAlimento);

router.get('/usuarios', usuariosController.getUsuarios);
router.get('/usuarios/:id', usuariosController.getUsuarioById);
router.post('/usuarios', usuariosController.criarUsuario);
router.put('/usuarios/:id', usuariosController.atualizarUsuario);
router.delete('/usuarios/:id', usuariosController.deletarUsuario);

router.get('/dias', diaController.getDias);
router.get('/dias/:idUsuario', diaController.getDiaById);
router.post('dias', diaController.criarDia);
router.put('dias/:id', diaController.atualizaDia);
router.delete('dia:id', diaController.deletaDia);


//dia/id e de todos

module.exports = router;

