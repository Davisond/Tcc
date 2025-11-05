<template>
  <div class="feedback-card">
    
    
    <div v-if="!carregando">
    <h2>Análise Inteligente</h2>

    <button @click="toggleInsight" class="botao-ia">
      {{ mostrarInsight ? '' : 'gerar Insight' }}
      <i :class="mostrarInsight ? 'fa-solid fa-xmark' : 'fa-solid fa-microchip'"></i>
      
    
    </button>
    </div>
    <div v-if="carregando" class="loading">Gerando insight...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>

    <div v-if="mostrarInsight && insightIa" class="analise-ia-geral">
      <h3>Analise inteligente</h3>
      <p>{{ insightIa }}</p>
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
    const insightIa = ref("");
    const carregando = ref(false);
    const erro = ref("");

    const toggleInsight = async () => {
      // se já estiver mostrando, fecha
      if (mostrarInsight.value) {
        mostrarInsight.value = false;
        return;
      }

      try {
        carregando.value = true;
        erro.value = "";
        // chanma insight
        const { data } = await axios.get("http://localhost:3333/analise/feedbacks");
        insightIa.value = data.insightIa || "Sem insights, utilize o app antes :)";
        mostrarInsight.value = true;
      } catch (err) {
        erro.value = "Erro ao gerar insight";
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

.botao-container {
  margin-bottom: 1.2rem;
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
}

.botao-ia:hover {
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
}

.analise-ia-geral h3 {
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  color: #3b2f80;
}

.sem-insight {
  margin-top: 1.2rem;
  font-style: italic;
  color: #333;
}

.loading,
.erro {
  text-align: center;
  font-weight: bold;
  padding: 1rem;
}

.erro {
  color: #d9534f;
}
</style>
