    <template>
        <div class="card">
            <form @submit.prevent="cadastrarNovoAlimento">
                <input type="text" v-model="nome" placeholder="nome do alimento" required/>
                <input type="Number" v-model="carboidrato" placeholder="carboidrato" required/>
                <input type="Number" v-model="proteina" placeholder="proteina" required/>
                <input type="Number" v-model="gordura" placeholder="gordura" required/>
                <input type="Number" v-model="caloria" placeholder="Kcal" required/>
                <input type="Number" v-model="porcao" placeholder="Porção em gramas de uma unidade" required/>
            <button type="submit">Cadastrar alimento personalizado</button>
            <button type="button" @click="$emit('fechar')">Cancelar</button>
        </form>
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
                            idUsuario: usuarioLogado.id,
                        }

                        await axios.post('http://localhost/3333/alimentosPersonalizados', novoAlimento);
                        alert("Alimento Cadastrado!");
                        this.resetarFormulario();
                        this.$defineEmits("alimentoCriado");
                        

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
