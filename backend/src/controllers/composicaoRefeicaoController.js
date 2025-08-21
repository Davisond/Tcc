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
  try {
    const { idUsuario, idAlimento, quantidade } = req.body;
     console.log("[composicao] body recebido:", req.body);

    // 1. Garante o dia de hoje
    const idDia = await composicaoModel.getOuCriaDia(idUsuario);
    const idRefeicao = await composicaoModel.getOuCriaRefeicao(idUsuario, idDia);

      console.log("[composicao] criando com:", {
        idRefeicao,
        idUsuario,
        idAlimento,
        quantidade
        });
    // 3. Cria composição
    const novaComposicao = await composicaoModel.criarComposicao({
      idRefeicao,
      idUsuario,
      idAlimento,
      quantidade
    });

    res.status(201).json({
      id: novaComposicao.insertId,
      idRefeicao,
      idUsuario,
      idAlimento,
      quantidade
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar composição" });
  }
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
