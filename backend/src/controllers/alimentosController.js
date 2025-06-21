const alimentosModel = require('../models/alimentosModel');

    //ALIMENTOS
//GET
const getAlimentos = async (request, response) => {
    const alimentos = await alimentosModel.getAlimentos();
    return response.status(200).json(alimentos);
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
    //USUARIOS
//GET
const getUsuarios = async (request, response) => {
    const usuarios = await alimentosModel.getusuarios();
    return response.status(200).json(usuarios);
}
//POST
const criarUsuario = async (request, response) => {
    const usuarioCriado = await alimentosModel.criarUsuario(request.body);
    return response.status(201).json(usuarioCriado);
};
//PUT
const atualizarUsuario = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.atualizarUsuario(id,request.body);
    return response.status(204).json();
}
const deletarUsuario = async (request, response) => {
    const { id } = request.params;
    await alimentosModel.deletarUsuario(id);
    return response.status(204).json();
}

module.exports = {
    getAlimentos, criarAlimento, atualizarAlimento, deletarAlimento,
    getUsuarios, criarUsuario, atualizarUsuario, deletarUsuario

}