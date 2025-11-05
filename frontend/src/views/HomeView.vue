<template>
  <div class="home">
  <macroDia ref="macroDiaComponent"/>
  <refeicao-lista />
  <iaFeedbacks />


  </div>  
</template>
<script>
import macroDia from '../components/macroDia.vue'
import refeicaoLista from '../components/refeicaoLista.vue'
import iaFeedbacks from '../components/iaFeedbacks.vue'

export default {
  
  components: {
    name: 'HomeView',
    macroDia,
    refeicaoLista,
    iaFeedbacks
    
   },
}

</script>
<style scoped>
.home {
  padding: 16px;
  padding-bottom: 100px; 
  min-height: 100vh;
  
}
</style>
