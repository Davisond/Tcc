const connection = require('./connection');

const getRefeicoes = async () => {
  const [rows] = await connection.execute('SELECT * FROM refeicao');
  return rows;
};

const criarRefeicao = async (refeicao) => {
  const { idAlimento, quantidade, data, tipo, idUsuario, idDia } = refeicao;
  const query = `
    INSERT INTO refeicao (idAlimento, quantidade, data, tipo, idUsuario, idDia)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connection.execute(query, [idAlimento, quantidade, data, tipo, idUsuario, idDia]);
  return result;
};

const atualizarRefeicao = async (id, refeicao) => {
  const { idAlimento, quantidade, data, tipo, idUsuario, idDia } = refeicao;
  const query = `
    UPDATE refeicao
    SET idAlimento = ?, quantidade = ?, data = ?, tipo = ?, idUsuario = ?, idDia = ?
    WHERE id = ?
  `;
  const [result] = await connection.execute(query, [idAlimento, quantidade, data, tipo, idUsuario, idDia, id]);
  return result;
};

const deletarRefeicao = async (id) => {
  const [result] = await connection.execute('DELETE FROM refeicao WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getRefeicoes,
  criarRefeicao,
  atualizarRefeicao,
  deletarRefeicao
};
