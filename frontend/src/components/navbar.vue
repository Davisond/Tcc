<template>
    <nav>
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
           

    </nav>
</template>


<script>
    export default {
        name: 'navbar'

    }
</script>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 75px;
  background-color: bisque;
  border-top: 4px solid bisque;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav a {
    font-weight: bold;
    color: black;
    margin: 12px;
    transition: .5s;
    text-decoration: none;
}

 nav a:hover {
        color: white;
    }

</style>
