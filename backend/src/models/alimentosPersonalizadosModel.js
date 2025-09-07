// models/alimentosPersonalizadosModel.js
const connection = require('./connection');

//POST
const criarAlimentoPersonalizado = async (alimento) => {
    const { nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, idDia } = alimento;
    const query = `INSERT INTO alimentopersonalizado (nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario]);
    return result;
};

//GET
const listarAlimentosPersonalizados = async () => {
    const query = 'SELECT * FROM alimentopersonalizado';
    const [result] = await connection.execute(query);
    return result;
};


//PUT
const atualizarAlimentoPersonalizado = async (id, dados) => {
    const { nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario } = dados;
    const query = `
        UPDATE alimentopersonalizado
        SET nome = ?, carboidrato = ?, proteina = ?, gordura = ?, caloria = ?, porcao = ?, idUsuario = ?
        WHERE id = ?
    `;
    const [result] = await connection.execute(query, [nome, carboidrato, proteina, gordura, caloria, porcao, idUsuario, id]);
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
    
    atualizarAlimentoPersonalizado,
    deletarAlimentoPersonalizado,
};
