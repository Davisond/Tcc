<template> 
    <div class="feedback-card">
    <h2>Análise de Feedbacks</h2>

    <div v-if="carregando" class="loading">Carregando análises...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>

    <div v-else class="feedback-lista">
      <div v-for="(item, index) in feedbacks" :key="index" class="feedback-item">
        <h3>{{ item.nome }}</h3>
        <p><strong>Total:</strong> {{ item.qtd }}</p>
        <p><strong>Negativos:</strong> {{ item.negativos }} | <strong>Positivos:</strong> {{ item.positivos }}</p>
        <p class="alerta" :class="{ ruim: item.alerta.includes('negativos'), bom: item.alerta.includes('aceito') }">
          {{ item.alerta }}
        </p>
        <div class="analise-ia">
          <strong>Insight da IA:</strong>
          <p>{{ item.analiseIa }}</p>
        </div>
      </div>
    </div>
  </div>


</template>
  <script>

import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "FeedbackAnalise",
  setup() {
    const feedbacks = ref([]);
    const carregando = ref(true);
    const erro = ref("");

    const carregarAnalises = async () => {
      try {
        const { data } = await axios.get("http://localhost:3333/analise/feedbacks"); // ajusta porta se for diferente
        feedbacks.value = data;
      } catch (err) {
        console.error("Erro ao carregar análises:", err);
        erro.value = "Erro ao carregar análises de feedback.";
      } finally {
        carregando.value = false;
      }
    };

    onMounted(carregarAnalises);

    return {
      feedbacks,
      carregando,
      erro,
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
  padding: 1.2rem;
  border-radius: 12px;
  margin: 1rem;
  font-family: "Arial", sans-serif;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  color: black;
}

.feedback-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feedback-item {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feedback-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.feedback-item h3 {
  margin: 0;
  color: black;
  font-size: 1.2rem;
}

.alerta {
  margin-top: 5px;
  font-weight: bold;
  text-transform: capitalize;
}

.alerta.ruim {
  color: #ff6961;
}

.alerta.bom {
  color: #90ee90;
}

.analise-ia {
  background-color: rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: black;
}

.loading,
.erro {
  text-align: center;
  font-weight: bold;
  color: black;
  padding: 1rem;
}
</style>









