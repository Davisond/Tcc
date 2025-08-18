const resumoDiaModel = require('../models/resumoDiaModel');

const getResumoDia = async (req, res) => {
  const { idUsuario } = req.params;
  const resumo = await resumoDiaModel.getResumoDia(idUsuario);
  return res.status(200).json(resumo);
};

module.exports = {
  getResumoDia
};