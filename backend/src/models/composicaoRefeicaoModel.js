const connection = require('./connection');

// GET
const getAll = async () => {
    const [composicoes] = await connection.execute('SELECT * FROM composicaoRefeicao');
    return composicoes;
};

// POST
const criarComposicao = async (composicao) => {
    const { idRefeicao, quantidade, idUsuario, idAlimento } = composicao;
    const query = 'INSERT INTO composicaoRefeicao(idRefeicao, quantidade, idUsuario, idAlimento) VALUES (?,?,?,?)';
    const [novaComposicao] = await connection.execute(query, [idRefeicao, quantidade, idUsuario, idAlimento]);
    return novaComposicao;
};

// PUT
const atualizarComposicao = async (id, composicao) => {
    const { idRefeicao, idAlimento, quantidade } = composicao;
    const query = 'UPDATE composicaoRefeicao SET idRefeicao = ?, quantidade = ?, idAlimento = ?,  WHERE id = ?';
    await connection.execute(query, [idRefeicao, quantidade, idAlimento, id]);
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
