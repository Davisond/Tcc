const composicaoModel = require('../models/composicaoRefeicaoModel');

const getComposicoes = async (req, res) => {
    const composicoes = await composicaoModel.getAll();
    return res.status(200).json(composicoes);
};

const getByIdUsuario = async(request, response) => {
    const { idUsuario } = request.params;
    const usuario = await composicaoModel.getByIdUsuario(idUsuario)
    return response.status(200).json(usuario);
}

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


const deleteByRefeicaoAndAlimento = async (req, res) => {
    const { idRefeicao, idAlimento } = req.params;

    try {
        const deleted = await composicaoModel.deleteByRefeicaoAndAlimento(idRefeicao, idAlimento);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Composição não encontrada' });
        }

        res.status(200).json({ message: 'Composição removida com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover composição' });
    }
};

module.exports = {
    deleteByRefeicaoAndAlimento,
    getByIdUsuario,
    getComposicoes,
    criarComposicao,
    atualizarComposicao,
    deletarComposicao
};
