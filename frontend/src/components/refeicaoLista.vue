<template>
    <div class="refeicaoLista">
        <div v-if="refeicoes.length === 0">
            <p>Ainda não foram cadastrados alimentos</p>
        </div>

        <ul v-else>
            <li v-for="refeicao in refeicoes" :key="refeicao.id" class="refeicaoItens">
                <strong> {{ refeicao.tipo }}</strong>
                <button class="adicionarFeedback" @click="abrirCardFeedback(refeicao.id)"> <i class="fa-solid fa-lightbulb"></i> </button>
        

        <div v-if="refeicaoSelecionada === refeicao.id" class="cardFeedback">
            <p> o quão disposto está após a refeição? </p>
            <div class="opcoesFeedback">
                <button v-for="num in 5" :key="num" @click="enviarFeedback(num, refeicao.id)">
                    {{ num }}
                </button>
            </div>
        </div>
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
        const refeicaoSelecionada = ref(null);


        const abrirCardFeedback = (idRefeicao) => {
            refeicaoSelecionada.value = refeicaoSelecionada.value === idRefeicao ? null: idRefeicao;
        };

        const enviarFeedback = async (valor, idRefeicao) => {
            try {
                const usuarioLogado = getUsuarioLogado();
                    if (!usuarioLogado) {
                        alert ("necessário efetuar login");
                        return
                    }
                
                const getDescricaoFeedback = (valor) => {
                    switch (valor) {
                        case 1:
                        return "Me senti muito mal, indisposto etc";
                        case 2:
                        return "Me senti mal";
                        case 3:
                        return "Indiferente";
                        case 4:
                        return "Me senti bem";
                        case 5:
                        return "Me senti muito bem, muito disposto";
                        default:
                        return "Sem descrição";
                        }
                    };

                    const feedback = {
                        idUsuario: usuarioLogado.id,
                        descricao: getDescricaoFeedback(valor),
                        sensacao: valor,
                        idRefeicao,
                    };


                    // testar o post lá no insomnia
                    await axios.post("http://localhost:3333/feedback", feedback);
                    alert ('feedback registrado.')

                    //closeCard
                    refeicaoSelecionada.value = null;


            }catch (err) {
                console.error("erro refeicaoLista.vue", err);
            }

        }

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
            refeicaoSelecionada, 
            abrirCardFeedback, 
            enviarFeedback
        }
    },
};
</script>


<style scoped>
.refeicaoLista{
    background: linear-gradient(to right, rgba(59, 56, 160, 0.3), rgba(175, 139, 210, 0.3));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 25px;
    margin: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    transition: 0.2s ease-in-out;
    }
.refeicaoItens{
    background: #4b3fad;
    border-radius: 25px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:  white;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    font-family: "Arial", sans-serif;
    padding: 0.7rem 1.5rem;
    transition: 0.2s ease-in-out;
    }

.adicionarFeedback{
    border:none;
    background: #4b3fad;
    border-radius: 30px;
    color:white;
    align-items: center;
    height: 30px;
}

.adicionarFeedback:hover{
    border:none;
    background: #4b3fad;
    border-radius: 30px;
    color: #ffa726;
    align-items: center;
    height: 30px;
    font-weight: bold;
}


.cardFeedback{
    margin-top: 10px;
    background: #fff3e0;
    padding: 0.75rem;
    border-radius: 8px;
    width: 100%;
    align-items: center;
}
.opcoesFeedback button {
    margin: 2px;    
    border: none;
    cursor: pointer;
    background: #ffa726;
    color: white;
    width: 8px;
    align-items: center;

}
.opcoesFeedback button:hover {
    background: #fb8c00;


}


</style>