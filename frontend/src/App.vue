<template>
  <div class="screen">
    <headerComponent/>
    <navbar @toggleAlimentos="toggleAlimentos" />  

    <criar-alimento v-if="showInputCreate" @fechar="fecharCriar" @alimentoCriado="atualizarLista"/>
    <alimentos-lista @criarPersonalizado="abrirCriarAlimento" class="overlay" v-if="showAlimentosList" :idRefeicao="idRefeicao" :idUsuario="idUsuario" @adicionado="onAdicionado" /> 
  <router-view :key="viewKey" />
  </div> 
</template>

<script>
  import headerComponent from './components/header.vue';
  import navbar from './components/navbar.vue';
  import alimentosLista from './components/alimentosLista.vue';
  import axios from 'axios';
  import criarAlimento from './components/criarAlimento.vue';

  export default{
    name: 'app',
    components: { 
      criarAlimento,
      navbar,  
      headerComponent,
      alimentosLista,
      
    },
    data () {
      return {
        showAlimentosList: false,
        showInputCreate: false,
        idUsuario: null,
        viewKey: 0
      };
    },
    mounted() {
      // lógica para buscar o id do usuário no localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuarioLogado) {
            this.idUsuario = usuarioLogado.id;
        }
    },
    methods: {

      abrirCriarAlimento() {
        this.showInputCreate = true;
        this.showAlimentosList = false;
      },
      fecharCriar() {
        this.showInputCreate = false;
        this.showAlimentosList = true;
      },
      atualizarLista(){
        this.showInputCreate = false;
        this.showAlimentosList = true;
        this.viewKey+=1; //força
      },
      async toggleAlimentos() {
        this.showAlimentosList = !this.showAlimentosList;
        if (this.showAlimentosList) {
        await this.getOrCreateRefeicao(); 
    } 
      },
      async getOrCreateRefeicao() {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

        //tenta buscar os dias do usuario 
        const diasRes = await axios.get(`http://localhost:3333/dias/${usuario.id}`);
         // flat() para tratar arrays aninhados e pegar o primeiro objeto.
        let dia = diasRes.data.flat()[0];


        if (!dia) {
        console.alert('Nenhum dia encontrado para o usuário, criando novo em App.vue');
        const novoDiaRes = await axios.post("http://localhost:3333/dias", {
          idUsuario: usuario.id,
          data: new Date().toISOString().slice(0, 10) // yyyy-mm-dd
        });
        dia = novoDiaRes.data[0]; 
      }
        const refeicaoRes = await axios.get(`http://localhost:3333/refeicao/dia/${dia.id}`)
        const refeicao = refeicaoRes.data.flat()[0];

        if (refeicao) {
          this.idRefeicao = refeicao.id;
          console.log("idRefeicao em app.vue: " + this.idRefeicao);
        }

      },
      onAdicionado() {
        this.showAlimentosList = false;
        this.viewKey += 1;
      }
    }
  }

</script>
<style>
  .overlay{
position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: #f3e8fd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 300px;
  }



</style>
