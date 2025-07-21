import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, props: true },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), props: true},
  { path: '/login', name: 'login', component: LoginView},
  { path: '/cadastro', name: 'cadastro', component: CadastroView},

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
