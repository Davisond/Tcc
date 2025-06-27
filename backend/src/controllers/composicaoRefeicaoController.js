const composicaoModel = require('../models/composicaoRefeicaoModel');

const getComposicoes = async (req, res) => {
    const composicoes = await composicaoModel.getAll();
    return res.status(200).json(composicoes);
};

const criarComposicao = async (req, res) => {
    const novaComposicao = await composicaoModel.criarComposicao(req.body);
    return res.status(201).json(novaComposicao);
};

const atualizarComposicao = async (req, res) => {
    const { id } = req.params;
    await composicaoModel.atualizarComposicao(id, req.body);
    return res.status(204).json();
};

const deletarComposicao = async (req, res) => {
    const { id } = req.params;
    await composicaoModel.deletarComposicao(id);
    return res.status(204).json();
};

module.exports = {
    getComposicoes,
    criarComposicao,
    atualizarComposicao,
    deletarComposicao
};
