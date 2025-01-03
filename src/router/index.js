import { createRouter, createWebHistory } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'
import LoginUser from '../components/LoginUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/registration', component: RegistrationForm },
    { path: '/login', component: LoginUser },
  ],
})

export default router
