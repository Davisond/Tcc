const alimentosModel = require('../models/alimentosModel');

const getAll = async (request, response) => {
    const alimentos = await alimentosModel.getAll();
    return response.status(200).json(alimentos);
}

const criarAlimento = async (request, response) => {
    const alimentoCriado = await alimentosModel.criarAlimento(request.body);
    return response.status(201).json(alimentoCriado);
};

const atualizarAlimento = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.atualizarAlimento(id, request.body);
    return response.status(204).json();
};


const deletarAlimento = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.deletarAlimento(id);
    return response.status(204).json();
};



module.exports = {
    getAll, criarAlimento, atualizarAlimento, deletarAlimento

}