const connection = require('./connection');

const getFeedback = async () => {
  const [rows] = await connection.execute('SELECT * FROM feedback');
  return rows;
};

const criarFeedback = async (feedback) => {
  const { idUsuario, descricao, sensacao, idRefeicao } = feedback;
  const query = `
    INSERT INTO feedback (idUsuario, descricao, sensacao, idRefeicao)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await connection.execute(query, [idUsuario, descricao, sensacao, idRefeicao]);
  return result;
};

const atualizarFeedback = async (id, feedback) => {
  const { idUsuario, descricao, sensacao, idRefeicao } = feedback;
  const query = `
    UPDATE feedback
    SET idUsuario = ?, descricao = ?, sensacao = ?, idRefeicao = ?
    WHERE id = ?
  `;
  const [result] = await connection.execute(query, [idUsuario, descricao, sensacao, idRefeicao, id]);
  return result;
};

const deletarFeedback = async (id) => {
  const [result] = await connection.execute('DELETE FROM feedback WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getFeedback,
  criarFeedback,
  atualizarFeedback,
  deletarFeedback
};
