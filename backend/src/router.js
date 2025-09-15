const express = require('express');

const alimentosController = require('./controllers/alimentosController');
const usuariosController = require('./controllers/usuariosController');
const diaController = require('./controllers/diaController');
const refeicaoController = require('./controllers/refeicaoController');
const alimentosPersonalizadosController = require ('./controllers/alimentosPersonalizadosController');
const composicaoRefeicaoController = require('./controllers/composicaoRefeicaoController');
const feedbackController = require('./controllers/feedbackControler');
const resumoDiaController = require('./controllers/resumoDiaController');
const { getFeedbackAnalise } = require('./controllers/analiseController');

const router = express.Router();
router.get('/resumo/:idUsuario', resumoDiaController.getResumoDia);
router.get('/analise/feedbacks', getFeedbackAnalise);

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
router.post('/dias', diaController.criarDia);
router.put('/dias/:id', diaController.atualizaDia);
router.delete('dias:id', diaController.deletaDia);

router.get('/refeicao', refeicaoController.getRefeicoes);
router.get('/refeicao/dia/:idDia', refeicaoController.getRefeicoesByDia);
router.post('/refeicao', refeicaoController.criarRefeicao);
router.put('/refeicao/:id', refeicaoController.atualizarRefeicao);
router.delete('/refeicao/:id', refeicaoController.deletarRefeicao);

router.get('/alimentosPersonalizados', alimentosPersonalizadosController.listarAlimentosPersonalizados);
router.post('/alimentosPersonalizados', alimentosPersonalizadosController.criarAlimentoPersonalizado);

// router.put('/alimentosPersonalizados/:id', alimentosPersonalizadosController.atualizarAlimentoPersonalizado);
// router.delete('/alimentosPersonalizados/:id', alimentosPersonalizadosController.deletarAlimentoPersonalizado);

router.get('/composicao', composicaoRefeicaoController.getComposicoes);
router.get('/composicao/:idUsuario', composicaoRefeicaoController.getByIdUsuario);
router.post('/composicao', composicaoRefeicaoController.criarComposicao);
router.put('/composicao/:idUsuario', composicaoRefeicaoController.atualizarComposicao);
router.delete('/composicao/:id', composicaoRefeicaoController.deletarComposicao);
router.delete('/composicao/:idRefeicao/:idAlimento', composicaoRefeicaoController.deleteByRefeicaoAndAlimento);


router.get('/feedback', feedbackController.getFeedback);
router.post('/feedback', feedbackController.criarFeedback);
// router.put('/feedback/:id', feedbackController.atualizarFeedback);
// router.delete('/feedback/:id', feedbackController.deletarFeedback);




// router.get('resumo/:idUsuario', resumoDiaControll er.getResumoDiaUser)



module.exports = router;

