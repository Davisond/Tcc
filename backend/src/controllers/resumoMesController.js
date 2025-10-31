const { getResumoMes } = require('../models/resumoMesModel');

const resumoMes = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ erro: 'ID do usuário não informado.' });
    }

    const resumo = await getResumoMes(idUsuario);

    return res.status(200).json(resumo);
  } catch (error) {
    console.error('[ERRO resumoMes]:', error); 
    return res.status(500).json({ erro: 'Erro ao gerar resumo mensal.' });
  }
};

module.exports = { resumoMes };