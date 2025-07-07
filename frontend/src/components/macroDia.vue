<template>
  <div class="macro">
    <h2>Macronutrientes</h2>
    <div class="macroLinha">
      <span>{{ consumido.proteina }}g / {{ objetivos.objetivoProteina }}g</span>
    </div>
    <div class="macroLinha">
      <span>{{ consumido.carboidrato }}g / {{ objetivos.objetivoCarboidrato }}g</span>
    </div>
    <div class="macroLinha">
      <span>{{ consumido.gordura }}g / {{ objetivos.objetivoGordura }}g</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'macroDia',
  setup() {
    const idDia = 3;

    const objetivos = ref({});
    const consumido = ref({});

    onMounted(async () => {
      const res = await axios.get(`http://localhost:3333/resumo/${idDia}`);
      objetivos.value = res.data.objetivos;
      consumido.value = res.data.consumido;
    });

    return {
      objetivos,
      consumido
    };
  }
}
</script>

<style scoped>
.macro {
  background-color: bisque;
  padding: 1rem;
  border-radius: 8px;
}

.macroLinha {
  margin-bottom: 0.5rem;
}
</style>
