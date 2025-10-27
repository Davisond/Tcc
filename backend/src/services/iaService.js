
const apiKey = 'sk-db85ce5272824deab5a9bacde5d956e4';
const url = 'https://api.deepseek.com/chat/completions';

async function gerarAnaliseIa(item){
    const prompt = `
    Analise os seguintes dados sobre um alimento:
    Nome: ${item.nome}
    - Total de feedbacks: ${item.qtd}
    - Feedbacks negativos: ${item.negativos}
    - Feedbacks positivos: ${item.positivos}
    gere um breve insight em português brasileiro descrevendo 
    o que pode estar acontecendo com este alimento e como melhorar ou substituir.`;
    
    
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


