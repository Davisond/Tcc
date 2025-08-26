<template>
  <div class="alimentosList">
    <h2>Alimentos consumidos</h2>

    <div 
      class="alimentoCard" v-for="(alimento, index) in alimentosConsumidos" :key="index">
      
      <div class="alimentoInfoWrapper">
        <span class="alimentoNome">{{ alimento.nome }}<br></span>
        <span class="alimentoInfo">
          proteina: {{ alimento.proteina }}g  &nbsp;
          carboidrato: {{ alimento.carboidrato }}g  &nbsp;
          Gordura: {{ alimento.gordura }}g 
        </span>
      </div>

      <button 
        class="deleteBtn" 
        @click="removerAlimento(alimento.idRefeicao, alimento.id)"
      >
        🗑
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'alimentosConsumidos',
  setup() {
    const alimentosConsumidos = ref([]);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Função para carregar alimentos
    const carregarAlimentos = async () => {
      try {
        if (!usuarioLogado) {
        console.warn("Nenhum usuário logado!");
        return;
        }
        //Buscar composição por usuário
        const composicaoRes = await axios.get(`http://localhost:3333/composicao/${usuarioLogado.id}`);
        const listaComposicao = composicaoRes.data;

        //Buscar dados completos de cada alimento
        const promessas = listaComposicao.map(async (item) => {
          const alimentoRes = await axios.get(`http://localhost:3333/alimentos/${item.idAlimento}`);
          return {
            ...alimentoRes.data[0], // dados do alimento
            idRefeicao: item.idRefeicao, // adicionar idRefeicao
            quantidade: item.quantidade
          };
        });

        alimentosConsumidos.value = await Promise.all(promessas);
      } catch (error) {
        console.error('Erro ao carregar alimentos consumidos:', error);
      }
    };

    // Função remover alimento
    const removerAlimento = async (idRefeicao, idAlimento) => {
      try {
        await axios.delete(`http://localhost:3333/composicao/${idRefeicao}/${idAlimento}`);
        // Atualiza lista
        await carregarAlimentos();
      } catch (error) {
        console.error('Erro ao remover alimento:', error);
      }
    };

    onMounted(carregarAlimentos);

    return {
      alimentosConsumidos,
      removerAlimento
    };
  }
};
</script>

<style scoped>

.alimentosList {
  padding: 0 1rem;
  margin-bottom: 2rem;
}
.alimentosList h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a148c;
}
.alimentoCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.alimentoInfo {
  font-family: 'Arial', sans-serif;
  color: #444;
}
.deleteBtn {
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: red;
}
.deleteBtn:hover {
  opacity: 0.7;
}
</style>
