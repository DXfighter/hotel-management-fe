import { createRouter, createWebHistory } from 'vue-router'
import RegistrerUser from '../components/RegistrerUser.vue'
import EditUser from '../components/EditUser.vue'
import LoginUser from '../components/LoginUser.vue'
import RegisterClient from '../components/RegisterClient.vue'
import RegisterRoom from '../components/RegisterRoom.vue'
import EditRoom from '../components/EditRoom.vue'
import CreateReservation from '../components/CreateReservation.vue'
import ShowReservations from '../components/ShowReservations.vue'
import ShowClents from '../components/ShowClients.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/registration', component: RegistrerUser },
    { path: '/editUser', component: EditUser },
    { path: '/login', component: LoginUser },
    { path: '/registerClient', component: RegisterClient },
    { path: '/registerRoom', component: RegisterRoom },
    { path: '/editRoom', component: EditRoom },
    { path: '/createReservation', component: CreateReservation },
    { path: '/showReservations', component: ShowReservations },
    { path: '/showClients', component: ShowClents },
  ],
})

export default router
