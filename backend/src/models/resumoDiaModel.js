
const connection = require('./connection');



const getResumoDia = async (idDia) => {

    // 1. Pega idUsuario vinculado ao dia
    const [diaRow] = await connection.execute(
        'SELECT idUsuario FROM dia WHERE id = ?', [idDia]
    );

    if (!diaRow.length) {
        return null;  // dia não encontrado
    }

    const idUsuario = diaRow[0].idUsuario;

    // 2. Pega objetivos do usuário
    const [usuarioRow] = await connection.execute(
        'SELECT objetivoProteina, objetivoCarboidrato, objetivoGordura FROM usuario WHERE id = ?', 
        [idUsuario]
    );

    if (!usuarioRow.length) {
        return null;  // usuário não encontrado
    }

    const objetivos = usuarioRow[0];

    // 3. Pega refeições do dia
    const [refeicoes] = await connection.execute(
        'SELECT id FROM refeicao WHERE idDia = ?', [idDia]
    );

    let totalProteina = 0;
    let totalCarboidrato = 0;
    let totalGordura = 0;

    // Se não tiver refeicoes, já devolve zerado
    if (!refeicoes.length) {
        return {
            objetivos,
            consumido: {
                proteina: 0,
                carboidrato: 0,
                gordura: 0
            }
        };
    }

    // 4. Para cada refeição, busca composições e soma macros
    for (const refeicao of refeicoes) {
        const [composicoes] = await connection.execute(
            `SELECT cr.quantidade, a.proteina, a.carboidrato, a.gordura
             FROM composicaoRefeicao cr
             JOIN alimentos a ON cr.idAlimento = a.id
             WHERE cr.idRefeicao = ?`,
            [refeicao.id]
        );

        for (const item of composicoes) {
            const fator = item.quantidade / 100;
            totalProteina += item.proteina * fator;
            totalCarboidrato += item.carboidrato * fator;
            totalGordura += item.gordura * fator;
        }
    }

    return {
        objetivos,
        consumido: {
            proteina: parseFloat(totalProteina.toFixed(2)),
            carboidrato: parseFloat(totalCarboidrato.toFixed(2)),
            gordura: parseFloat(totalGordura.toFixed(2))
        }
    };
};

module.exports = { getResumoDia };
