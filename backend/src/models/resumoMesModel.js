const connection = require('./connection');


const getResumoMes = async (idUsuario) => {
    console.log('[resumoMes] IN -> idUsuario =', idUsuario);

    const [dias] = await connection.execute(
    `SELECT id, data FROM dia 
     WHERE idUsuario = ? 
     AND MONTH(data) = MONTH(CURDATE()) 
     AND YEAR(data) = YEAR(CURDATE())`,
    [idUsuario]
    );

    let refeicoesCompletas = [];


    for (const dia of dias){
        const [refeicoes] = await connection.execute(
        'SELECT id, data FROM refeicao WHERE idDia = ?',
        [dia.id]
    );
    

    for (const refeicao of refeicoes) {
        // Alimentos da refeição
        const [alimentos] = await connection.execute(
        `SELECT a.nome, cr.quantidade
            FROM composicaoRefeicao cr
            JOIN alimentos a ON cr.idAlimento = a.id
            WHERE cr.idRefeicao = ?`,
        [refeicao.id]
        );
    
        // Feedbacks da refeição
    const [feedbacks] = await connection.execute(
    `SELECT descricao, sensacao 
        FROM feedback 
        WHERE idUsuario = ? AND idRefeicao = ?`,
    [idUsuario, refeicao.id]
    );

        refeicoesCompletas.push({
            idRefeicao: refeicao.id,
            data: dia.data,
            alimentos,
            feedbacks
        });
        }
    }

    const resumo = {
        usuario: idUsuario,
        periodo: new Date().toISOString().slice(0, 7), // YYYY-MM
        refeicoes: refeicoesCompletas
    };

  console.log('[resumoMes] OUT -> refeicoes =', refeicoesCompletas.length);
  return resumo;
};

module.exports = { getResumoMes };