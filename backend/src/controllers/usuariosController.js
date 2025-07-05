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
    const { nome, email, senha, idade, sexo, peso, altura, objetivo } = request.body;

    let objetivoProteina = 0
    let objetivoCarboidrato = 0;
    let objetivoGordura = 0;

    if (objetivo === 'ganho de massa muscular') {
      
        objetivoProteina = peso * 2;
        objetivoCarboidrato = peso * 6;
        objetivoGordura = peso * 1;
    }
    const usuarioFinal = {
        nome,
        email,
        senha,
        idade,
        sexo,
        peso,
        altura,
        objetivo,
        objetivoProteina,
        objetivoCarboidrato,
        objetivoGordura
    }

    const usuarioCriado = await usuariosModel.criarUsuario(usuarioFinal);
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