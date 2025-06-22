const connection = require('./connection');

    //ALIMENTO
//GET
const getAlimentos =  async () => {
    const alimentos = await connection.execute('SELECT * FROM alimentos');
    return alimentos;
};
//GET BY ID
const getAlimentoById = async (id) => {
    const [getAlimento] = await connection.execute('SELECT * FROM alimentos WHERE id = ?', [id]);
    return getAlimento;
};
//POST
const criarAlimento = async (alimento) => {
    const { nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade} = alimento;
    const query = 'INSERT INTO alimentos(nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade) VALUES (?,?,?,?,?,?,?)';
    const [alimentoCriado] = await connection.execute(query, [nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade]);
    return alimentoCriado;
}   
//PUT
const atualizarAlimento = async (id, alimento) => {
        const { nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade} = alimento;
        const query = 'UPDATE alimentos SET nome = ?, carbohidrato = ?, proteina = ?, gordura = ?, caloria = ?, porcao = ?, quantidade = ? WHERE id = ?';
        const alimentoAtualizado = await connection.execute(query, [ nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade, id]);
        return alimentoAtualizado;
}
//DELETE
const deletarAlimento = async (id) => {
    const alimentoDeletado = await connection.execute('DELETE FROM alimentos WHERE id = ?', [id]);
    return alimentoDeletado; 
}

module.exports = {
    getAlimentos, criarAlimento, atualizarAlimento, deletarAlimento, getAlimentoById

};