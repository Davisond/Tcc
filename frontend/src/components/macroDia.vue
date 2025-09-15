<template>
  <div class="macro">
    <h2>Macronutrientes</h2>

    <div class="progress-columns">
      <div class="line">
        <div class="progress-container">
          <div class="skill">
            <div class="outer">
              <div class="inner">
                <div id="consumido">{{ consumido.proteina }}</div>
                <div id="objetivo">/{{ objetivos.objetivoProteina }}g</div>
              </div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="70px" height="70px">
            <defs>
              <linearGradient id="GradientColorProteina">
                <stop offset="0%" stop-color="#DA22FF" />
                <stop offset="100%" stop-color="#9733EE" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="35" r="27.5" stroke-linecap="round" :style="{ 'stroke-dashoffset': dashOffset.proteina, 'stroke': 'url(#GradientColorProteina)' }" />
          </svg>

        </div>
        <label>Proteína</label>
      </div>

      <div class="line">
        <div class="progress-container">
          <div class="skill">
            <div class="outer">
              <div class="inner">
                <div id="consumido">{{ consumido.carboidrato }}</div>
                <div id="objetivo">/{{ objetivos.objetivoCarboidrato }}g</div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60px" height="60px">
            <defs>
              <linearGradient id="GradientColorCarboidrato">
                <stop offset="0%" stop-color="#DA22FF" />
                <stop offset="100%" stop-color="#9733EE" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="35" r="27.5" stroke-linecap="round" :style="{ 'stroke-dashoffset': dashOffset.carboidrato, 'stroke': 'url(#GradientColorCarboidrato)' }" />
          </svg>
        </div>
        <label>Carboidrato</label>
      </div>

      <div class="line">
        <div class="progress-container">
          <div class="skill">
            <div class="outer">
              <div class="inner">
                <div id="consumido">{{ consumido.gordura }}</div>
                <div id="objetivo">/{{ objetivos.objetivoGordura }}g</div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60px" height="60px">
            <defs>
              <linearGradient id="GradientColorGordura">
                <stop offset="0%" stop-color="#DA22FF" />
                <stop offset="100%" stop-color="#9733EE" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="35" r="27.5" stroke-linecap="round" :style="{ 'stroke-dashoffset': dashOffset.gordura, 'stroke': 'url(#GradientColorGordura)' }" />
          </svg>
        </div>
        <label>Gordura</label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { getUsuarioLogado } from "../utils/auth";

export default {
  setup() {
    const objetivos = ref({});
    const consumido = ref({});
    const circleCircumference = 166.5; // (2 * Math.PI * 26.5)

    const carregarResumo = async () => {
      try {
        const usuarioLogado = getUsuarioLogado();
        if (!usuarioLogado) {
          console.error("Não há usuário logado");
          alert("Não há usuário logado");
          return;
        }
        const { data: resumo } = await axios.get(`http://localhost:3333/resumo/${usuarioLogado.id}`);
        objetivos.value = resumo.objetivos;
        consumido.value = resumo.consumido;
        console.log("Resumo recebido:", resumo);
      } catch (err) {
        console.error("Erro ao carregar resumo: ", err);
      }
    };

    onMounted(carregarResumo);

    const porcentagem = computed(() => {
      const p = (consumido.value.proteina / objetivos.value.objetivoProteina) * 100 || 0;
      const c = (consumido.value.carboidrato / objetivos.value.objetivoCarboidrato) * 100 || 0;
      const g = (consumido.value.gordura / objetivos.value.objetivoGordura) * 100 || 0;

      return {
        proteina: Math.min(100, p).toFixed(0),
        carboidrato: Math.min(100, c).toFixed(0),
        gordura: Math.min(100, g).toFixed(0),
      };
    });

    const dashOffset = computed(() => {
      const p = circleCircumference - (circleCircumference * porcentagem.value.proteina) / 100;
      const c = circleCircumference - (circleCircumference * porcentagem.value.carboidrato) / 100;
      const g = circleCircumference - (circleCircumference * porcentagem.value.gordura) / 100;

      return {
        proteina: p,
        carboidrato: c,
        gordura: g,
      };
    });

    return {
      objetivos,
      consumido,
      porcentagem,
      dashOffset,
    };
  },
};
</script>

<style scoped>
.progress-columns {
  display: flex;
  justify-content: space-around; 
  align-items: flex-start; 

}
.line{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.macro {
  background: linear-gradient(to right, rgba(59, 56, 160, 0.3), rgba(175, 139, 210, 0.3));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem;
  font-family: "Arial", sans-serif;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
.progressRing {
  display: flex;
  flex-direction: row;
  
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
} 
label {
  font-weight: bold;
  color: white;
  margin-top: 5px;
  text-align: center;
}
.progress-container {
  width: 72px;
  height: 70px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.skill {
  width: 56px;
  height: 63px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.outer { 
    width: 52px;
    height: 51px;
    padding: 5px;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner {
    width: 48px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(255, 255, 255, 1), -0.5px -0.5px 0px rgba(0, 0, 0, 0.15), -0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    border-radius: 50%;
}

#consumido {
  font-weight: 600;
  color: black;
  text-align: center;

}
#objetivo {
  color: #000;
  font-size: 10px;
  opacity: 0.6;
  text-align: center;


}
svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;    
}
circle {
    fill: none;
    stroke-width: 5px;
    stroke-dasharray: 172.8; /* 2 * Math.PI * 27.5 */ 
    transition: stroke-dashoffset 2s linear; 
    transform-origin: 50% 50%;
}
</style>