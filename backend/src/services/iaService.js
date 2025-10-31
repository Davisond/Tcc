
const apiKey = 'sk-db85ce5272824deab5a9bacde5d956e4';
const url = 'https://api.deepseek.com/chat/completions';

async function gerarAnaliseIa(alimentos){
    const prompt = `
    Analise os seguintes dados sobre um alimento:
    Nome: ${item.nome}
    - Total de feedbacks: ${item.qtd}
    - Feedbacks negativos: ${item.negativos}
    - Feedbacks positivos: ${item.positivos}
    Faça em poucas palavras correlações de alimentos que podem estar causando mal estar, porque e como substituir`;
    
    //Correlações de alimentos que causem bem/mal estar em determinados alimentos;
    //Pegar todos os dados na ultima semana e fornecer a Ia por json;
    //Definir formato de resposta para IA, foco deve ser entrega de respostas para api formato [json]json.parse;
    //Tratamento de erro p resposta de IA com try catch;
    //Interação IA com botão flutuante (opções padronizadas);
    //


    const body = {
        model: 'deepseek-chat',
        stream: false,
        messages: [
            { role: 'system', content: 'Você é um analista que gera insights sobre alimentos e feedbacks de clientes.' },
            { role: 'user', content: prompt }
        ]
    };
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });
    
    
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || 'Não foi possível gerar análise.';
}


module.exports = { gerarAnaliseIa };





// const { getResumoMes } = require('./models/resumoMesModel');

// async function gerarAnaliseIaMensal(idUsuario) {
//   try {
//     const resumo = await getResumoMes(idUsuario);

//     const prompt = `
//     Analise o consumo mensal do usuário e os feedbacks relacionados.
//     Retorne um JSON com campos:
//     - "possiveis_causas_mal_estar"
//     - "alimentos_recomendados"
//     - "sugestoes_substituicao"
    
//     Base de dados (JSON):
//     ${JSON.stringify(resumo)}
//     `;

//     const body = {
//       model: 'deepseek-chat',
//       stream: false,
//       messages: [
//         { role: 'system', content: 'Você é um nutricionista virtual que analisa padrões alimentares e feedbacks.' },
//         { role: 'user', content: prompt }
//       ]
//     };

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify(body)
//     });

//     const data = await response.json();
//     return JSON.parse(data?.choices?.[0]?.message?.content || '{}');
//   } catch (error) {
//     console.error('Erro ao gerar análise mensal:', error);
//     return { erro: 'Falha ao gerar análise mensal.' };
//   }
// }
