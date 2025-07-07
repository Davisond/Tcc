<template>
  <div class="macro">
    <h2>Macronutrientes</h2>
   
    <div class="macroLinha">
        <label> Proteina </label>
      <span>{{ consumido.proteina }}g / {{ objetivos.objetivoProteina }}g</span>
    </div>
    <div class="macroLinha">
        <label> Carbohidrato </label>
      <span>{{ consumido.carboidrato }}g / {{ objetivos.objetivoCarboidrato }}g</span>
    </div>
    <div class="macroLinha">
        <label> Gordura </label>
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
  background-color: #f3e8fd; 
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1); 
  font-family: 'Arial', sans-serif;
  margin: 1rem;
  border-block:  #2c3e50;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
}

.macroLinha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0c7fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 12px;
  color: #4a148c;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

label {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 8px;
}
</style>
