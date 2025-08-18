<template>
  <div class="macro">
    <h2>Macronutrientes</h2>

    <div class="macroLinha">
      <label>Proteína</label>
      <span>{{ consumido.proteina }}g / {{ objetivos.objetivoProteina }}g</span>
    </div>
    <div class="macroLinha">
      <label>Carboidrato</label>
      <span>{{ consumido.carboidrato }}g / {{ objetivos.objetivoCarboidrato }}g</span>
    </div>
    <div class="macroLinha">
      <label>Gordura</label>
      <span>{{ consumido.gordura }}g / {{ objetivos.objetivoGordura }}g</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { getUsuarioLogado } from "../utils/auth";

export default {
  setup() {
    const objetivos = ref({});
    const consumido = ref({});

    const carregarResumo = async () => {
      try {
        const usuarioLogado = getUsuarioLogado();
        if (!usuarioLogado) {
          console.error("Não há usuário logado");
          alert("Não há usuário logado");
          return;
        }

        //backend já cuida de pegar/criar o dia atual
        const { data: resumo } = await axios.get(
          `http://localhost:3333/resumo/${usuarioLogado.id}`
        );

        objetivos.value = resumo.objetivos;
        consumido.value = resumo.consumido;
        console.log("Resumo recebido:", resumo);
      } catch (err) {
        console.error("Erro ao carregar resumo: ", err);
      }
    };

    onMounted(carregarResumo);

    return {
      objetivos,
      consumido,
    };
  },
};
</script>

<style scoped>
.macro {
  background-color: #f3e8fd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  margin: 1rem;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
}

.macroLinha {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0c7fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 12px;
  color: #4a148c;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

label {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 8px;
}
</style>
