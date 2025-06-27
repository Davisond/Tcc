const connection = require('./connection');

// GET
const getAll = async () => {
    const [composicoes] = await connection.execute('SELECT * FROM composicaoRefeicao');
    return composicoes;
};

// POST
const criarComposicao = async (composicao) => {
    const { idRefeicao, idAlimento, quantidade } = composicao;
    const query = 'INSERT INTO composicaoRefeicao(idRefeicao, idAlimento, quantidade) VALUES (?,?,?)';
    const [novaComposicao] = await connection.execute(query, [idRefeicao, idAlimento, quantidade]);
    return novaComposicao;
};

// PUT
const atualizarComposicao = async (id, composicao) => {
    const { idRefeicao, idAlimento, quantidade } = composicao;
    const query = 'UPDATE composicaoRefeicao SET idRefeicao = ?, idAlimento = ?, quantidade = ? WHERE id = ?';
    await connection.execute(query, [idRefeicao, idAlimento, quantidade, id]);
};

// DELETE
const deletarComposicao = async (id) => {
    await connection.execute('DELETE FROM composicaoRefeicao WHERE id = ?', [id]);
};

module.exports = {
    getAll,
    criarComposicao,
    atualizarComposicao,
    deletarComposicao
};
