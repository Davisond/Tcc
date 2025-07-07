<template>
  <div class="home">
  <macroDia />
  <alimentosLista />

  </div>
</template>


<script>
import alimentosLista from '../components/alimentosLista.vue'
import macroDia from '../components/macroDia.vue'


export default {
  components: {
    macroDia,
    alimentosLista
  }
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
