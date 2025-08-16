<template>
  <div class="daily">

    <!-- Aqui chamamos o componente passando o idUsuario -->
    <alimentos-consumidos :idUsuario="idUsuario" />
  </div>
</template>

<script>
import alimentosConsumidos from '@/components/alimentosConsumidos.vue';

export default {
  name: 'DailyView',
  components: {
    alimentosConsumidos
  },
  data() {
    return {
      idUsuario: 3 // aqui você pode colocar fixo, vir de login ou da rota
    };
  }
};
</script>

<style scoped>
.daily {
  padding: 1rem;
}
</style>
