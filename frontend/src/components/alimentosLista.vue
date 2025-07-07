<template>
  
  <div class="alimentosList">
    <div class ="alimentoCard" v-for="alimento in alimentos" :key="alimento.id">
        <span class="alimentoNome">{{ alimento.nome }}</span>
         <span class="alimentoInfo">
        {{ alimento.proteina }}g prot &nbsp;•&nbsp;
        {{ alimento.carboidrato }}g carb &nbsp;•&nbsp;
        {{ alimento.gordura }}g gordura
         </span>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    name: 'alimentosLista',
    setup () {

        const alimentos = ref({});

        onMounted(async () => {
            const res = await axios.get(`http://localhost:3333/alimentos/`);
            console.log(res.data)
            alimentos.value = res.data[0];
        });
        return{
            alimentos,

        };
    }
}


</script>

<style scoped>
.alimentosList {
    padding: 0 1rem;
    margin-bottom: 2rem;
}

.alimentoCard {
  display: flex;
  flex-direction: column;
  background-color: #e0c7fa;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.alimentoNome {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #2c3e50; 
  font-size: 1.05rem;
  margin-bottom: 4px;
}
.alimentoInfo{
  font-family: 'Arial', sans-serif;
  color: #444;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>