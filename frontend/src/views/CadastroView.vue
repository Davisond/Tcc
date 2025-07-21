<template>
    <div>
        <h2>Cadastro</h2>
        <form @submit.prevent="fazerCadastro">
            <input type="text" v-model="nome" placeholder="nome" required />
            <input type="email" v-model="email" placeholder="email" required />
            <input type="password" v-model="senha" placeholder="senha" required />
            <input type="number" v-model="idade" placeholder="Idade" required/>
            <input type="number" v-model="peso" placeholder="Peso em kg" required/>
            <input type="number" v-model="altura" placeholder="Altura em cm" required />

            <div class="radio">
                <label>Sexo de nascimento:</label>
                <label><input type="radio" value="M" v-model="sexo" /> Masculino</label>
                <label><input type="radio" value="F" v-model="sexo" /> Feminino</label>
            </div>

            <div class="radio">
                <label>Objetivo:</label>
                <label><input type="radio" value="ganho de massa muscular" v-model="objetivo" /> ganho de massa muscular</label>
                <label><input type="radio" value="perda de peso" v-model="objetivo" /> perda de peso</label>
            </div>

            <button type="submit">Cadastrar</button>
            <p class="link" @click="$router.push('/login')"> Já tem conta? faça login agora!</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data () {
            return {
                nome: '',
                email: '',
                senha: '',
                idade: '',
                sexo: '',
                peso: '',
                altura: '',
                objetivo: ''
            };
        },
        methods: {
            async fazerCadastro(){
                const usuario = {
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha,
                    idade: this.idade,
                    sexo: this.sexo,
                    peso: this.peso,
                    altura: this.altura,
                    objetivo: this.objetivo
                };
                const res = await axios.post('http://localhost:3333/usuarios', usuario);
                console.log('Usuário cadastrado:', res.data);
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

div {
  max-width: 300px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f3e8fd; 
  border-radius: 12px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2c3e50; 
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: #e0c7fa; 
  color: #4a148c;
  font-weight: 500;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

input::placeholder {
  color: #4a148c;
  font-weight: 400;
}

.radio {
  margin-bottom: 1rem;
  background-color: #e0c7fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #2c3e50;
  font-weight: bold;
}

.radio label {
  display: block;
  margin-top: 0.5rem;
  font-weight: normal;
  color: #4a148c;
}

button {
  padding: 0.75rem;
  background-color: #4a148c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s;
}

button:hover {
  background-color: #37006b;
}

.link {
  margin-top: 1rem;
  text-align: center;
  color: #4a148c;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;
}

.link:hover {
  color: #2c3e50;
}


</style>