<template>
    <div class="refeicaoLista">
        <div v-if="refeicoes.length === 0">
            <p>Ainda não foram cadastrados alimentos</p>
        </div>

        <ul v-else>
            <li v-for="refeicao in refeicoes" :key="refeicao.id" class="refeicaoItens">
                <strong> {{ refeicao.tipo }}</strong>
            </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios';
import { ref, onMounted } from 'vue';
import { getUsuarioLogado } from "../utils/auth";


export default {
    name: 'refeicaoLista',
    setup() {     
        const refeicoes = ref([]);

        const carregarRefeicoes = async () => {
            try {        
                const usuarioLogado = getUsuarioLogado();
                if(!usuarioLogado){
                    console.error("necessario efetuar login");
                    alert("necessario efetuar login");
                    return;
                }
                const { data: resumo } = await axios.get(`http://localhost:3333/resumo/${usuarioLogado.id}`)
                const idDia = resumo.idDia;
                console.log("Resumo recebido:", resumo);
                const { data } =  await axios.get(`http://localhost:3333/refeicao/dia/${idDia}`);        

                refeicoes.value = data;
                console.log("refeicoes recebidas:", data);
            } catch (err) {
                alert("erro refeicaoLista.vue:", err);
            }
        }
        onMounted(carregarRefeicoes);
        
        return {
            refeicoes,
        }
    },
};
</script>


<style scoped>
.refeicaoLista{
    background-color: #fdf3e8;
    padding: 1rem;
    border-radius: 12px;
    margin: 1rem;
    font-family: "Arial", sans-serif;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }
.refeicaoItens{
    background-color: #ffe0b2;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #4a2c00;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    }


</style>