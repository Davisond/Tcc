<template>
  <div class="screen">
    <navbar @toggleAlimentos="toggleAlimentos" /> 
    <alimentos-lista class="overlay" v-if="showAlimentosList" :idRefeicao="idRefeicao" :idUsuario="idUsuario" @adicionado="onAdicionado"
    /> 
  <router-view :key="viewKey" />
  </div> 
</template>

<script>
  import navbar from './components/navbar.vue';
  import alimentosLista from './components/alimentosLista.vue';

  export default{
    name: 'app',
    components: { 
      navbar ,
      alimentosLista
    },
    data () {
      return {
        showAlimentosList: false,
        idRefeicao: 3,
        idUsuario: 3,
        viewKey: 0
      };
    },
    methods: {
      toggleAlimentos() {
        this.showAlimentosList = !this.showAlimentosList;
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
