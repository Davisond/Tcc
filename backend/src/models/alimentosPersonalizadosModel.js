// models/alimentosPersonalizadosModel.js
const connection = require('./connection');

//POST
const criarAlimentoPersonalizado = async (alimento) => {
    const { nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia } = alimento;
    const query = `INSERT INTO alimentopersonalizado (nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia]);
    return result;
};

//GET
const listarAlimentosPersonalizados = async () => {
    const query = 'SELECT * FROM alimentopersonalizado';
    const [result] = await connection.execute(query);
    return result;
};

//GET BY ID
const buscarPorId = async (id) => {
    const query = 'SELECT * FROM alimentopersonalizado WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result[0];
};

//PUT
const atualizarAlimentoPersonalizado = async (id, dados) => {
    const { nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia } = dados;
    const query = `
        UPDATE alimentopersonalizado
        SET nome = ?, carboidrato = ?, proteina = ?, gordura = ?, caloria = ?, porcao = ?, idUsuario = ?, idDia = ?
        WHERE id = ?
    `;
    const [result] = await connection.execute(query, [nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia, id]);
    return result;
};

//DELETE 
const deletarAlimentoPersonalizado = async (id) => {
    const query = 'DELETE FROM alimentopersonalizado WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
};

module.exports = {
    criarAlimentoPersonalizado,
    listarAlimentosPersonalizados,
    buscarPorId,
    atualizarAlimentoPersonalizado,
    deletarAlimentoPersonalizado,
};
