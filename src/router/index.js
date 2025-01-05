import { createRouter, createWebHistory } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'
import LoginUser from '../components/LoginUser.vue'
import RegisterClient from '../components/RegisterClient.vue'
import RegisterRoom from '../components/RegisterRoom.vue'
import CreateReservation from '../components/CreateReservation.vue'
import ShowReservations from '../components/ShowReservations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/registration', component: RegistrationForm },
    { path: '/login', component: LoginUser },
    { path: '/registerClient', component: RegisterClient },
    { path: '/registerRoom', component: RegisterRoom },
    { path: '/createReservation', component: CreateReservation },
    { path: '/showReservations', component: ShowReservations },
  ],
})

export default router
