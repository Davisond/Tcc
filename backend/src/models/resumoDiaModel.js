const connection = require('./connection');

// Se sua tabela DIA tem coluna `data` use esta versão:
async function getOrCreateDiaAtual(idUsuario) {
  // tenta pegar o dia de HOJE
  const [d] = await connection.execute(
    'SELECT id FROM dia WHERE idUsuario = ? AND DATE(data) = CURDATE() LIMIT 1',
    [idUsuario]
  );
  if (d.length) return d[0].id;

  // se não existe, cria
  const [ins] = await connection.execute(
    'INSERT INTO dia (idUsuario, data) VALUES (?, CURDATE())',
    [idUsuario]
  );
  return ins.insertId;
}

const getResumoDia = async (idUsuario) => {
  console.log('[resumo] IN -> idUsuario =', idUsuario);

  // garante um idDia válido para hoje/mais recente
  const idDia = await getOrCreateDiaAtual(idUsuario);
  console.log('[resumo] usando idDia =', idDia);

  // objetivos do usuário
  const [usuarioRow] = await connection.execute(
    'SELECT objetivoProteina, objetivoCarboidrato, objetivoGordura FROM usuario WHERE id = ?',
    [idUsuario]
  );
  const objetivos =
    usuarioRow[0] || { objetivoProteina: 0, objetivoCarboidrato: 0, objetivoGordura: 0 };
  console.log('[resumo] objetivos =', objetivos);

  // refeições do dia
  const [refeicoes] = await connection.execute(
    'SELECT id FROM refeicao WHERE idDia = ?',
    [idDia]
  );
  console.log('[resumo] refeicoes encontradas =', refeicoes.length);

  let totalProteina = 0;
  let totalCarboidrato = 0;
  let totalGordura = 0;

  if (!refeicoes.length) {
    console.log('[resumo] sem refeições para o dia => consumido = 0');
    return {
      objetivos,
      consumido: { proteina: 0, carboidrato: 0, gordura: 0 },
    };
  }

  for (const refeicao of refeicoes) {
    const [composicoes] = await connection.execute(
      `SELECT cr.quantidade, a.proteina, a.carboidrato, a.gordura
       FROM composicaoRefeicao cr
       JOIN alimentos a ON cr.idAlimento = a.id
       WHERE cr.idRefeicao = ?`,
      [refeicao.id]
    );

    for (const item of composicoes) {
      // Se os macros são por 100g e quantidade está em 100g
      const fator = item.quantidade; // ou item.quantidade / 100 se for por grama
      totalProteina += item.proteina * fator;
      totalCarboidrato += item.carboidrato * fator;
      totalGordura += item.gordura * fator;
    }
  }

  const consumido = {
    proteina: totalProteina,
    carboidrato: totalCarboidrato,
    gordura: totalGordura,
  };

  console.log('[resumo] OUT -> consumido =', consumido);
  return { idDia, objetivos, consumido };
};

module.exports = { getResumoDia };
