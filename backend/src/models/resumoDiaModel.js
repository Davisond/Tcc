
const connection = require('./connection');

const getResumoDia = async (idDia) => {

    //Pega idUsuario vinculado ao dia
    const [diaRow] = await connection.execute(
        'SELECT idUsuario FROM dia WHERE id = ?', [idDia]
    );

    const idUsuario = diaRow[0].idUsuario;

    //Pega objetivos da tabela usuario
    const [usuarioRow] = await connection.execute(
        'SELECT objetivoProteina, objetivoCarboidrato, objetivoGordura FROM usuario WHERE id = ?', 
        [idUsuario]
    );

    if (!usuarioRow.length) {
        return null; 
    }

    const objetivos = usuarioRow[0];

    //Pega refeições do dia referenciando idDia, obv
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

    for (const refeicao of refeicoes) {
        const [composicoes] = await connection.execute(
            `SELECT cr.quantidade, a.proteina, a.carboidrato, a.gordura
             FROM composicaoRefeicao cr
             JOIN alimentos a ON cr.idAlimento = a.id
             WHERE cr.idRefeicao = ?`,
            [refeicao.id]
        );

        //as tabelas nutricionais padronizam por 100g, tipo frango 25g de proteina em 100g
        //se comeu 150g, entao fator = 150g/100g = 1.5
        //fator de proteina(25g frango) * 1.5 = 37,5g de proteína

        for (const item of composicoes) {
            const fator = item.quantidade; 
            totalProteina += item.proteina * fator; 
            totalCarboidrato += item.carboidrato * fator; 
            totalGordura += item.gordura * fator;
        }
    }

    return {
        objetivos,
        consumido: {
            proteina: totalProteina,
            carboidrato: totalCarboidrato,
            gordura: totalGordura
        }
    };
};

module.exports = { getResumoDia

 };
