const express = require('express');
const alimentosController = require('./controllers/alimentosController');
const router = express.Router();

router.get('/alimentos', alimentosController.getAll);
router.post('/alimentos', alimentosController.criarAlimento);
router.put('/alimentos/:id', alimentosController.atualizarAlimento);
router.delete('/alimentos/:id', alimentosController.deletarAlimento);


module.exports = router;
