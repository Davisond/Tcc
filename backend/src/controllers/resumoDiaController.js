const resumoDiaModel = require('../models/resumoDiaModel');

const getResumoDia = async (req, res) => {
  const { idDia } = req.params;
  const resumo = await resumoDiaModel.getResumoDia(idDia);
  return res.status(200).json(resumo);
};

module.exports = {
  getResumoDia
};