<template>
    <div class="feedback-card">
        <h2>Análise Inteligente</h2>

        <div v-if="!carregando">
            <button @click="toggleInsight" class="botao-ia" :disabled="carregando">
                {{ mostrarInsight ? '' : 'Gerar Insight' }}
                <i :class="mostrarInsight ? 'fa-solid fa-xmark' : 'fa-solid fa-microchip'"></i>
            </button>
        </div>

        <div v-if="carregando" class="loading">Gerando insight... </div>

        <div v-else-if="insightIa && insightIa.erro" class="erro">{{ insightIa.erro }}</div>
        <div v-else-if="erro" class="erro">{{ erro }}</div>

        <div v-if="mostrarInsight && insightIa && !insightIa.erro" class="analise-ia-geral">
            
            <h3>{{ insightIa.resumo_geral || 'Análise de Padrão Alimentar' }}</h3>
            
            <div 
                v-for="(insight, index) in insightIa.insights" 
                :key="index" 
                class="insight-item"
            >
                <h4>{{ insight.titulo }}</h4>
                <p :class="{'sugestao-substituicao': insight.tipo === 'alimento_sugestao'}">
                    {{ insight.descricao }}
                </p>
            </div>

            <div v-if="!insightIa.insights || insightIa.insights.length === 0" class="sem-insight">
                A IA não conseguiu encontrar correlações claras nos dados atuais.
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
    name: "FeedbackAnalise",
    setup() {
        const mostrarInsight = ref(false);
        const insightIa = ref(null); // Agora é um objeto (JSON) ou null
        const carregando = ref(false);
        const erro = ref("");

        const toggleInsight = async () => {
            if (mostrarInsight.value) {
                mostrarInsight.value = false;
                return;
            }

            try {
                carregando.value = true;
                erro.value = "";
                insightIa.value = null; 

                const response = await axios.get("http://localhost:3333/analise/feedbacks");
                
                const data = response.data;
                
                // Se o objeto retornado tiver a chave 'erro', armazena a mensagem de erro da IA/serviço
                if (data && data.erro) {
                    erro.value = data.erro;
                } else {
                    insightIa.value = data; // Armazena o objeto JSON completo
                    mostrarInsight.value = true;
                }
                
            } catch (err) {
                // Erro de rede ou do servidor Node
                erro.value = "Erro ao conectar com o servidor de análise. Verifique se o backend está rodando.";
                console.error(err);
            } finally {
                carregando.value = false;
            }
        };

        return {
            mostrarInsight,
            insightIa,
            carregando,
            erro,
            toggleInsight,
        };
    },
};
</script>

<style scoped>
.feedback-card {
    background: linear-gradient(to right, rgba(59, 56, 160, 0.3), rgba(175, 139, 210, 0.3));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: black;
    padding: 1rem;
    border-radius: 25px;
    margin: 1rem;
    max-width: 700px;
    font-family: "Arial", sans-serif;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    color: #2d2d2d;
}

.botao-ia {
    background-color: #4b3fad;
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    transition: 0.2s ease-in-out;
    cursor: pointer;
}

.botao-ia:hover:not(:disabled) {
    background-color: #5a189a;
    transform: scale(1.02);
}

.botao-ia:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.analise-ia-geral {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 1.2rem;
    border-radius: 10px;
    margin-top: 1rem;
    color: black;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.analise-ia-geral h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: #3b2f80;
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 0.5rem;
}

.insight-item {
    margin-top: 1rem;
    padding: 0.8rem;
    border-left: 4px solid #4b3fad;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
}

.insight-item h4 {
    color: #4b3fad;
    margin-bottom: 0.4rem;
    font-size: 1.1rem;
}

.sugestao-substituicao {
    font-style: italic;
    color: #008080;
    font-weight: 500;
}

.sem-insight {
    margin-top: 1.2rem;
    font-style: italic;
    color: #888;
    text-align: center;
}

.loading,
.erro {
    text-align: center;
    font-weight: bold;
    padding: 1rem;
}

.erro {
    color: #d9534f;
    background-color: rgba(255, 0, 0, 0.1);
    border-radius: 5px;
}
</style>