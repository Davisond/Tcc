<template>
  <div class="home">
  <macroDia ref="macroDiaComponent"/>
  <refeicao-lista />
 
  </div>  
</template>


<script>
import macroDia from '../components/macroDia.vue'
import refeicaoLista from '../components/refeicaoLista.vue'


export default {
  
  components: {
    name: 'HomeView',
    macroDia,
    refeicaoLista
    
   },
}

</script>
<style scoped>
.home {
  padding: 16px;
  padding-bottom: 100px; 
  background-color: #f9f9f9c9;
  min-height: 100vh;
}
</style>
