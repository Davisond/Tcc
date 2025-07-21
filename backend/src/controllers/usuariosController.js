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

    }else if (objetivo === 'perda de peso'){

        //o objetivo é preservar a massa magra, então aumentamos o perc de proteina, 
        //reduzimos o carbohidrato p forçar o corpo a usar a gordura em excesso como fonte de energ
        //reduzimos o consumo de gordura sem zerar (as fontes precisam ser limpas(ex:abacate))
        objetivoProteina = peso * 2.2; 
        objetivoCarboidrato = peso * 2.5;   
        objetivoGordura = peso * 0.8;        
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