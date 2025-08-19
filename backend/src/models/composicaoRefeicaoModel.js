const connection = require('./connection');

// GET
const getAll = async () => {
    const [composicoes] = await connection.execute('SELECT * FROM composicaoRefeicao');
    return composicoes;
};

const getByIdUsuario = async (idUsuario) => {
    const [getById] = await connection.execute('SELECT * FROM composicaoRefeicao WHERE idUsuario = ?', [idUsuario]);
    return getById;
};

// POST
const criarComposicao = async (composicao) => {
  const { idRefeicao, quantidade, idUsuario, idAlimento } = composicao;
  const query = 'INSERT INTO composicaoRefeicao(idRefeicao, quantidade, idUsuario, idAlimento) VALUES (?,?,?,?)';
  const [result] = await connection.execute(query, [idRefeicao, quantidade, idUsuario, idAlimento]);
  return result; // retorna o objeto com insertId
};

const getOuCriaDia = async (idUsuario) => {
     const [diaRows] = await connection.execute(
      'SELECT id FROM dia WHERE idUsuario = ? AND data = CURDATE()',
      [idUsuario]
    );  
    let idDia;
    if (diaRows.length === 0) {
      const [result] = await connection.execute(
        'INSERT INTO dia (idUsuario, data) VALUES (?, CURDATE())',
        [idUsuario]
      );
      idDia = result.insertId;
    } else {
      idDia = diaRows[0].id;
    }
    return idDia;
};

const getTipoRefeicao = () => {
  const hora = new Date().getHours();
  if (hora >= 8 && hora < 11) return "café da manhã";
  if (hora >= 11 && hora < 16) return "almoço";
  if (hora >= 16 && hora < 19) return "café da tarde";
  if (hora >= 19 && hora < 24) return "janta";
  return "refeição noturna"; 
};

const getOuCriaRefeicao = async (idUsuario, idDia) => {
  const [refeicaoRows] = await connection.execute(
    'SELECT id FROM refeicao WHERE idDia = ? AND idUsuario = ? LIMIT 1',
    [idDia, idUsuario]
  );

  if (refeicaoRows.length === 0) {
    const tipo = getTipoRefeicao();
    const dataHoje = new Date().toISOString().split("T")[0]; 
    console.log('tipo: ', tipo);
    console.log("dataHoje: ", dataHoje)

    const [result] = await connection.execute(
      'INSERT INTO refeicao (quantidade, data, tipo, idUsuario, idDia) VALUES (?, ?, ?, ?, ?)',
      [0, dataHoje, tipo, idUsuario, idDia]
    );
    return result.insertId;
  }
  return refeicaoRows[0].id;
};

// PUT
const atualizarComposicao = async (id, composicao) => {
    const { idRefeicao, idAlimento, quantidade } = composicao;
    const query = 'UPDATE composicaoRefeicao SET idRefeicao = ?, quantidade = ?, idAlimento = ?  WHERE id = ?';
    await connection.execute(query, [idRefeicao, quantidade, idAlimento, id]);
};

// DELETE
const deletarComposicao = async (id) => {
    await connection.execute('DELETE FROM composicaoRefeicao WHERE idRefeicao = ?, idUsuario = ?, idAlimento = ?', [idRefeicao], [idUsuario], [idAlimento]);
};

const deleteByRefeicaoAndAlimento = async (idRefeicao, idAlimento) => {
    const [result] = await connection.execute(
        'DELETE FROM composicaoRefeicao WHERE idRefeicao = ? AND idAlimento = ?',
        [idRefeicao, idAlimento]
    );
    return result.affectedRows > 0;
};

module.exports = {
    getOuCriaRefeicao,
    getTipoRefeicao,
    getOuCriaDia,
    deleteByRefeicaoAndAlimento,
    getByIdUsuario,
    getAll,
    criarComposicao,
    atualizarComposicao,
    deletarComposicao
};
