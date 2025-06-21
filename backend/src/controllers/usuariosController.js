const usuariosModel = require('../models/usuariosModel');


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
    getUsuarios, criarUsuario, atualizarUsuario, deletarUsuario

}