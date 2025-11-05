const apiKey = 'sk-db85ce5272824deab5a9bacde5d956e4';
const url = 'https://api.deepseek.com/chat/completions';




async function gerarAnaliseIa(dados) {
console.log('[iaService] entrar gerarAnaliseIa. tipo:', typeof dados);
console.log('[iaService] dados (raw):', JSON.stringify(dados, null, 2));


  if (!dados || !Array.isArray(dados)) {
console.error('[iaService] ERRO: "dados" não é array.');
    return 'erro, não tá vindo os alimentos (dados não é array)';
  }

 if (dados.length === 0) {
    console.warn('[iaService] aviso: array vazio.');
    return 'erro, array de alimentos vazio';
  }

  const problema = dados.find(d => typeof d.nome === 'undefined' || typeof d.qtd === 'undefined');
  if (problema) {
    console.error('[iaService] ERRO: item com shape inválido:', JSON.stringify(problema));
    return 'erro, formato dos itens inválido (falta nome ou qtd)';
  }

  try {
    const listaAlimentos = dados.map(a => `
      Nome: ${a.nome}
      - Total de feedbacks: ${a.qtd}
      - Feedbacks negativos: ${a.negativos ?? 0}
      - Feedbacks positivos: ${a.positivos ?? 0}
      - Alerta: ${a.alerta ?? 'N/A'}
    `).join('\n\n');

    const prompt = `
      Analise os seguintes dados de alimentos e feedbacks:
      ${listaAlimentos}

      Gere uma análise geral que identifique possíveis correlações entre alimentos e mal-estar, gera sugestões 
      de substituição para os alimentos com muitos feedbacks negativos por alimentos com os mesmos macronutrientes.
      gera coisa de duas linhas nessa reposta, não manda texto demais, estrutura assim:
      'alimentos: tal alimento apresenta alta correlação com mal estar, provavelmente por tal.
      sugestão de substituição: tal no lugar de tal mantem os mesmos macronutrientes e oferece melhor tolerancia digestiva'

      se houver mais sugestões, quebra linha de novo e repete

      
    
    `;

    const body = {
      model: 'deepseek-chat',
      stream: false,
      messages: [
        { role: 'system', content: 'Você é um analista que gera insights sobre hábitos alimentares e feedbacks de usuários.' },
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
  } catch (error) {
    console.error('[ERROOOO em gerarAnaliseIa] inferno do krl, isService.js:', error);
    return 'Erro ao gerar análise com IA.';
  }
}

module.exports = { gerarAnaliseIa };
