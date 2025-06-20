const alimentosModel = require('../models/alimentosModel');

    //ALIMENTOS
//GET
const getAlimentos = async (request, response) => {
    const alimentos = await alimentosModel.getAlimentos();
    return response.status(200).json(alimentos);
}
//GET BY ID
const getAlimentoById = async (request, response) => {
    const { id } = request.params;
    const alimento = await alimentosModel.getAlimentoById(id);
    return response.status(200).json(alimento);

}
//POST
const criarAlimento = async (request, response) => {
    const alimentoCriado = await alimentosModel.criarAlimento(request.body);
    return response.status(201).json(alimentoCriado);
};
//PUT
const atualizarAlimento = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.atualizarAlimento(id, request.body);
    return response.status(204).json();
};
//DELETE
const deletarAlimento = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.deletarAlimento(id);
    return response.status(204).json();
};
  
module.exports = {
getAlimentos, getAlimentoById, criarAlimento, atualizarAlimento, deletarAlimento
}