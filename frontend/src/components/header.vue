<template>
    <div class="header">
      <span class="bemVindo">Bem-vindo, {{ usuario?.nome }} </span>
      <button class="logoutBtn" @click="deslogar">Sair</button>
    </div>
</template>


<script>
 import { limparUsuarioLogado, getUsuarioLogado } from '../utils/auth'

    export default{
        name: 'headerComponent',
    
        data(){
            return{
                usuario: getUsuarioLogado()
            }
        },
        methods:{
            atualizarMacros(){
                this.$refs.macroDiaComponent.carregarResumo();
            },

            deslogar(){
                limparUsuarioLogado();
                this.$router.push('/login');
            }
        }
    }
    

</script>
<style scoped>

.logoutBtn {
  background-color: #fd7a78;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  float: right;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.bemVindo{
   font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}
.header {
    top: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}




</style>