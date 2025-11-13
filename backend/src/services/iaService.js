// iaService.js

const apiKey = 'sk-db85ce5272824deab5a9bacde5d956e4';
const url = 'https://api.deepseek.com/chat/completions';

async function gerarAnaliseIa(dados) {
    console.log('[iaService] entrar gerarAnaliseIa. tipo:', typeof dados);
    console.log('[iaService] dados (raw):', JSON.stringify(dados, null, 2));

    if (!dados || !Array.isArray(dados)) {
        console.error('[iaService] ERRO: "dados" não é array.');
        return { erro: 'Erro interno: Formato de dados inválido.' };
    }

    if (dados.length === 0) {
        console.warn('[iaService] aviso: array vazio.');
        return { erro: 'Análise não gerada: Nenhum dado alimentar registrado.' };
    }

    const problema = dados.find(d => typeof d.nome === 'undefined' || typeof d.qtd === 'undefined');
    if (problema) {
        console.error('[iaService] ERRO: item com shape inválido:', JSON.stringify(problema));
        return { erro: 'Erro interno: Formato dos itens inválido (falta nome ou qtd).' };
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
            Analise rigorosamente os seguintes dados de alimentos (Nome, Total de feedbacks, Negativos, Positivos, Alerta):
            ${listaAlimentos}

            Sua tarefa é gerar uma análise profissional com foco em:
            
            1. Correlações Não Óbvias: Identifique correlações fortes entre alimentos com alta taxa de feedbacks negativos e os 'Alertas' mencionados (se houver), ou qualquer outro padrão de intolerância.
            2. Sugestões de Substituição com Paridade Nutricional: Para cada alimento com ALTA correlação negativa, sugira uma substituição que mantenha a paridade de macronutrientes (ex: "Carne Vermelha por Peixe magro") e justifique a melhoria na tolerância digestiva.
            3. Resumo de Padrão (Macronutriente/Horário): No campo 'resumo_geral', identifique se o problema parece ser um macronutriente específico (ex: "Lactose" ou "Gordura de Digestão Lenta") ou um padrão de horário de consumo.
            Inclua no mínimo 3 itens em "insights". Lembre-se, a resposta FINAL deve ser APENAS o JSON conforme o esquema definido no System Role.
        `;
        
        const body = {
            model: 'deepseek-chat',
            stream: false,
            messages: [
                { role: 'system', content: `
    Você é um Analista Nutricional de Dados. Sua única função é analisar os dados e retornar o resultado EXCLUSIVAMENTE em formato JSON. 
    REGRAS CRÍTICAS:
    1. Não inclua NENHUM texto extra, introduções, explicações ou markdown (como \`\`\`json).
    2. A resposta deve ser APENAS o JSON puro, começando em '{' e terminando em '}'.
    3. CADA objeto dentro do array "insights" DEVE ter o "titulo" e a "descricao" preenchidos.
    4. O array "insights" DEVE conter no mínimo 3 itens COMPLETOS.
    
    Aderir estritamente ao esquema:
    {
      "insights": [
        {
          "tipo": "alimento_correlacao" | "alimento_sugestao",
          "titulo": "Resumo do Insight (OBRIGATÓRIO)",
          "descricao": "Análise detalhada ou sugestão (OBRIGATÓRIO)."
        },
        // ... mais 2 ou mais itens completos
      ],
      "resumo_geral": "Identificação de padrão de macronutriente ou horário com má tolerância."
    }
`},
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
        const iaResponseString = data?.choices?.[0]?.message?.content;

        if (iaResponseString) {
            try {
                // Tenta decodificar o JSON
                return JSON.parse(iaResponseString); 
            } catch (e) {
                console.error('[iaService] ERRO ao decodificar JSON da IA:', e);
                return { 
                    erro: "Análise incompleta. A IA falhou ao gerar o formato JSON esperado." 
                };
            }
        }

        return { erro: 'Não foi possível obter uma resposta da IA.' };

    } catch (error) {
        console.error('[ERROOOO em gerarAnaliseIa]:', error);
        return { erro: 'Erro de conexão ao gerar análise com IA.' };
    }
}

module.exports = { gerarAnaliseIa };