<template>
    <div class="modal-overlay">
        <div class="card">
            <button class="fechar-topo" @click="$emit('fechar')">x</button>

            <form @submit.prevent="cadastrarNovoAlimento">
                <h2>Cadastre seu alimento</h2>

                <input type="text" v-model="nome" placeholder="nome do alimento" required/>
                <input type="number" v-model="carboidrato" placeholder="carboidrato" required/>
                <input type="number" v-model="proteina" placeholder="proteina" required/>
                <input type="number" v-model="gordura" placeholder="gordura" required/>
                <input type="number" v-model="caloria" placeholder="Kcal" required/>
                <input type="number" v-model="porcao" placeholder="Porção em gramas" required/>

                <button type="submit" class="enviar">Cadastrar</button>
            </form>
        </div>
    </div>
</template>
    <script>
    import axios from 'axios';
    import { getUsuarioLogado } from "../utils/auth";
        export default{
            name: 'criarAlimento',
            data(){
                return{
                    nome: '',
                    carboidrato: '',
                    proteina: '',
                    gordura: '',
                    caloria: '', 
                    porcao: ''
                };
            },
            methods: {
                async cadastrarNovoAlimento() {
                    try{
                        const usuarioLogado = getUsuarioLogado();

                        const novoAlimento = {
                            nome: this.nome,
                            carboidrato: this.carboidrato,
                            proteina: this.proteina,
                            gordura: this.gordura,
                            caloria: this.caloria, 
                            porcao: this.porcao,
                            quantidade: 1,
                        }

                        await axios.post('http://localhost:3333/alimentos', novoAlimento);
                        alert("Alimento Cadastrado!");
                        this.resetarFormulario();
                        this.$emit("alimentoCriado");
                    } catch (error) {
                            console.error("Erro ao cadastrar alimento:", error);
                            alert("Erro ao cadastrar alimento!");
                    }
                },
                    resetarFormulario() {
                        this.nome = "";
                        this.carboidrato = "";
                        this.proteina = "";
                        this.gordura = "";
                        this.caloria = "";
                        this.porcao = "";
                        }
            }
        }
    </script>
    <style scoped>
.fechar-topo {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #5a189a;
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    width: 260px; 
    padding: 1.3rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to right, rgba(59, 56, 160, 0.3), rgba(175, 139, 210, 0.3));
    backdrop-filter: blur(50px);
}
input[type="text"], 
input[type="number"] {
    width: 95%;
    padding: 0.6rem;
    margin-bottom: 0.7rem;
    border-radius: 6px;
    border: 1px solid #fff;
    font-size: 0.9rem;
    background-color: #f6f0ff;
}
h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.enviar {
    display: block;
    width: 60%;
    margin: 1rem auto 0 auto;
    padding: 0.5rem;
    background-color: #5a189a;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
}
.enviar:hover {
    background-color: #9733EE;
    font-weight: bold;
}
.botoes {
    display: flex;
    width: 100%;
    margin-top: 1rem;
}
</style>

  