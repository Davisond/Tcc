const connection = require('./connection');

//GET
const getAll =  async () => {
    const alimentos = await connection.execute('SELECT * FROM alimentos');
    return alimentos;
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
        const query = 'UPDATE alimentos SET nome = ?, carbohidrato = ?, proteina = ?, caloria = ?, porcao = ?, quantidade = ? WHERE id = ?';
        const alimentoAtualizado = await connection.execute(query, [ nome, carbohidrato, proteina, gordura, caloria, porcao, quantidade, id]);
        return alimentoAtualizado;
}



//DELETE



module.exports = {
    getAll, criarAlimento

};