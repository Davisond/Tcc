const alimentosModel = require('../models/alimentosModel');

const getAll = async (request, response) => {
    const alimentos = await alimentosModel.getAll();
    return response.status(200).json(alimentos);
}

const criarAlimento = async (request, response) => {
    const alimentoCriado = await alimentosModel.criarAlimento(request.body);
    return response.status(201).json(alimentoCriado);
};



module.exports = {
    getAll, criarAlimento

}