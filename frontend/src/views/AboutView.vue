<template>
  <div class="daily">

    <alimentos-consumidos :idUsuario="idUsuario" />
  </div>
</template>

<script>
import alimentosConsumidos from '@/components/alimentosConsumidos.vue';

export default {
  name: 'DailyView',
  components: {
    alimentosConsumidos
  }
};
</script>

<style scoped>
.daily {
  padding: 1rem;
  
}
</style>
