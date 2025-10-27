<template>
  <nav class="navbar">
    <router-link to="/" class="nav-item">
    <i class="fa-jelly fa-regular fa-house"></i>
      <span>Home</span>
    </router-link>

    <button class="fab" @click="$emit('toggleAlimentos')">
      <i class="fa-solid fa-plus"></i>
    </button>

    <router-link to="/about" class="nav-item">
      <i class="fa-solid fa-calendar-day"></i>
      <span>Daily</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.nav-item {
  color: #555;
  font-size: 0.85rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s ease;
}

.nav-item i {
  font-size: 1.3rem;
  margin-bottom: 3px;
}

.nav-item:hover,
.nav-item.router-link-exact-active {
  color: #111;
  font-weight: 600;
}

/* Botão central */
.fab {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #6a00b8;
  color: #fff;
  border: none;
  font-size: 1.4rem;
  box-shadow: 0 3px 10px rgba(106, 0, 184, 0.3);
  cursor: pointer;
  transition: 0.25s ease;
}

.fab:hover {
  background: #580094;
  transform: translateX(-50%) scale(1.05);
}

.fab:active {
  transform: translateX(-50%) scale(0.95);
}

.nav-item span {
  font-size: 0.75rem;
}
</style>
