const connection = require('./connection');

const getAnaliseFeedback = async () => {
    const query = `
        SELECT 
        a.nome,
        COUNT(*) as qtd,
        SUM(CASE WHEN f.sensacao <= 2 THEN 1 ELSE 0 END) as negativos,
        SUM(CASE WHEN f.sensacao >= 4 THEN 1 ELSE 0 END) as positivos
        FROM composicaorefeicao ar
        JOIN alimentos a ON ar.idAlimento = a.id
        JOIN feedback f ON f.idRefeicao = ar.idRefeicao
        GROUP BY a.nome;
    `;
    const [rows] = await connection.execute(query);
    return rows;
}

module.exports = {getAnaliseFeedback};