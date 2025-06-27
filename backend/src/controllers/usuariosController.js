const usuariosModel = require('../models/usuariosModel');


//GET
const getUsuarios = async (request, response) => {
    const usuarios = await usuariosModel.getUsuarios();
    return response.status(200).json(usuarios);
}
//GET BY ID 
const getUsuarioById = async(request, response) => {
    const { id } = request.params;
    const usuario = await usuariosModel.getUsuarioById(id);
    return response.status(200).json(usuario);
}
//POST
const criarUsuario = async (request, response) => {
    const usuarioCriado = await usuariosModel.criarUsuario(request.body);
    return response.status(201).json(usuarioCriado);
};
//PUT
const atualizarUsuario = async (request, response) => {
    const { id } = request.params;
    await usuariosModel.atualizarUsuario(id,request.body);
    return response.status(204).json();
}
const deletarUsuario = async (request, response) => {
    const { id } = request.params;
    await usuariosModel.deletarUsuario(id);
    return response.status(204).json();
}

module.exports = {
    getUsuarios, getUsuarioById, criarUsuario, atualizarUsuario, deletarUsuario

}