<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="fazerLogin">
      <input type="email" v-model="email" placeholder="email" required />
      <input type="password" v-model="senha" placeholder="senha" required />
      <button type="submit">Entrar</button>
      <p class="link" @click="$router.push('/cadastro')">Ainda não tem conta? Cadastre-se!</p>
    </form>
    <p v-if="erro" class="erro">{{ erro }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { setUsuarioLogado } from '../utils/auth';

export default {
  data() {
    return {
      email: '',
      senha: '',
      erro: ''
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const res = await axios.get('http://localhost:3333/usuarios');

        // junta todos os arrays internos em um só
        const usuarios = res.data.flat();  

        // agora percorre os objetos corretos
        const usuarioEncontrado = usuarios.find(
        (u) =>
            u.email?.toLowerCase() === this.email.toLowerCase() && 
            u.senha === this.senha
        );

        if (usuarioEncontrado) {
          setUsuarioLogado(usuarioEncontrado);
          this.$router.push('/'); // redireciona para home
        } else {
          this.erro = 'Email ou senha inválidos';
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        this.erro = 'Erro no servidor';
      }
    }
  }
};
</script>

<style scoped>
.login {
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
input {
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: #e0c7fa;
  color: #4a148c;
  font-weight: 500;
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
}
.erro {
  margin-top: 1rem;
  text-align: center;
  color: red;
}
.link {
  margin-top: 1rem;
  text-align: center;
  color: #4a148c;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;
}
</style>
