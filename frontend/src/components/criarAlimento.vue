    <template>
        <div class="card">
            <form @submit.prevent="cadastrarNovoAlimento">
                <h2>Cadastre seu alimento</h2>
                <input type="text" v-model="nome" placeholder="nome do alimento" required/>
                <input type="Number" v-model="carboidrato" placeholder="carboidrato" required/>
                <input type="Number" v-model="proteina" placeholder="proteina" required/>
                <input type="Number" v-model="gordura" placeholder="gordura" required/>
                <input type="Number" v-model="caloria" placeholder="Kcal" required/>
                <input type="Number" v-model="porcao" placeholder="Porção em gramas de uma unidade" required/>
            <button type="submit" class="enviar">Cadastrar!</button>
            <button type="button" class="fechar" @click="$emit('fechar')">x</button>
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

                        await axios.post('http://localhost:3333/alimentosPersonalizados', novoAlimento);
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
        .card {
            max-width: 300px;
            margin: 2rem auto;
            padding: 2rem;
            background-color: #f3e8fd; 
            border-radius: 12px;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
            font-family: 'Arial', sans-serif;
        }
        input[type= "text"],[type= "Number"]{
            background-color: e0c7fa;
            padding: 0.7rem 1.7rem;
            margin-bottom: 1.0rem;
            border-radius: 8px;
        }
        h2{
            text-align: center;
            color: #2c3e50;
            margin-bottom: 1.7rem;
            font-weight: bold;
        }
        .enviar{
            font-size: 1rem;
            background-color: #00ff158e;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
            margin: 1rem auto;
        }
        .enviar:hover{
            font-size: 1rem;
            background-color: #00a70e;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        .fechar{
            font-size: 1rem;
            background-color: #f50e0e8f;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
            margin: 1rem auto;
        }
        .fechar:hover{
            font-size: 1rem;
            background-color: #a700008f;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;

        }




    </style>