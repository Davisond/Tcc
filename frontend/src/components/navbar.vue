<template>
    <nav>
        <router-link to="/">Home</router-link> 
        <button @click="$emit('toggleAlimentos')"> Bite+ </button>
        <router-link to="/about">Daily</router-link>

    </nav>  
</template>
  

<script>

    export default {
      name: 'navbar',
    }
</script>

<style scoped>
nav {
 position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}
nav a {
 color: #e0c7fa;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav a:hover,
nav a.router-link-exact-active {
  color: #2c3e50;
  font-weight: bold;
}

nav button{
  bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #a36be3;
  color: white;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  cursor: pointer;
}
  nav button:hover {
    background-color: #8b4fd1;
    transform: translateY(-50%) scale(1.5);
  }
      


</style>
