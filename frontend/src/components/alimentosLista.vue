<template>
  
  <div class="alimentosList">
    <h2>Alimentos</h2>
    <!-- <button @click="$emit('criarPersonalizado')" class="btnPersonalizado">+</button> -->

    <div class ="alimentoCard" v-for="alimento in alimentos" :key="alimento.id" @click ="adicionarAlimento(alimento)">
        <span class="alimentoNome">{{ alimento.nome }}</span>
         <span class="alimentoInfo">
        {{ alimento.proteina }}g prot &nbsp;•&nbsp;
        {{ alimento.carboidrato }}g carb &nbsp;•&nbsp;
        {{ alimento.gordura }}g gord
         </span>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    name: 'alimentosList',
    props: {
      idRefeicao: {
        type: Number,
        required: true
      },
      idUsuario: {
        type: Number,
        required: true
      }
    },
    emits: ['adicionado', 'criarPersonalizado'],
    setup (props, { emit }) {
        const alimentos = ref({});
        onMounted(async () => {
            const res = await axios.get(`http://localhost:3333/alimentos/`);
            console.log(res.data)
            alimentos.value = res.data[0];
        });

        const adicionarAlimento = async (alimento) => {
          const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
            console.log("idRefeicao: " + props.idRefeicao + " idAlimento: " + alimento.id + " idUsuario: " + usuarioLogado.id)

          
            if (!usuarioLogado) {
              alert("Usuário não logado!");
              return;
            }
                
          await axios.post(`http://localhost:3333/composicao`, {
            // idRefeicao: props.idRefeicao, 
            idAlimento: alimento.id,
            quantidade: 1,
            idUsuario: usuarioLogado.id
          });
  
             emit('adicionado');
             
        } 

     
        return{
            alimentos,
            adicionarAlimento

        };
    }
}
</script>

<style scoped>
.btnPersonalizado{
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;

}
.alimentosList {
    top: 200px;
    padding: 0 1rem;
    margin-bottom: 2rem;
    background: linear-gradient(to right, rgba(59, 56, 160, 0.3), rgba(175, 139, 210, 0.3));
    backdrop-filter: blur(50px);
    width: 450px;
    height: auto;
}
.alimentosList h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.alimentoCard {
  display: flex;
  flex-direction: column;
  background: #5a189a;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.alimentoCard:hover {
  display: flex;
  flex-direction: column;
  background: #9733EE;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.alimentoNome {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #fff; 
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.alimentoInfo{
  font-family: 'Arial', sans-serif;
  color: #fff;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>