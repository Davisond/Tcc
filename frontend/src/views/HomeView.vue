<template>
  <div class="home">
  <macroDia ref="macroDiaComponent"/>
  </div>  
</template>


<script>
import macroDia from '../components/macroDia.vue'


export default {
  
  components: {
    name: 'HomeView',
    macroDia },
}

</script>
<style scoped>
.home {
  padding: 16px;
  padding-bottom: 100px; 
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>
