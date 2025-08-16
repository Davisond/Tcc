const refeicaoModel = require('../models/refeicaoModel');

const getRefeicoes = async (req, res) => {
  const refeicoes = await refeicaoModel.getRefeicoes();
  res.json(refeicoes);
};

const criarRefeicao = async (req, res) => {
  const novaRefeicao = req.body;
  const result = await refeicaoModel.criarRefeicao(novaRefeicao);
  res.status(201).json(result);
};
const getRefeicoesByDia = async (req, res) => {
  const { idDia } = req.params;
  const refeicoes = await refeicaoModel.getRefeicoesByDia(idDia);
  res.json(refeicoes);
};

const atualizarRefeicao = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  const result = await refeicaoModel.atualizarRefeicao(id, dados);
  res.json(result);
};

const deletarRefeicao = async (req, res) => {
  const { id } = req.params;
  const result = await refeicaoModel.deletarRefeicao(id);
  res.json(result);
};

module.exports = { getRefeicoes, 
  criarRefeicao,
   atualizarRefeicao, 
   deletarRefeicao,
  getRefeicoesByDia };
