<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link to="/registration" v-if="isLoggedIn"> Регистрация </router-link>
        <router-link to="/login"> Вход </router-link>
        <router-link to="/registerClient" v-if="isLoggedIn"> Клиенти </router-link>
        <router-link to="/registerRoom" v-if="isLoggedIn && isAdmin"> Стаи </router-link>
        <router-link to="/createReservation" v-if="isLoggedIn"> Добави Резервация </router-link>
        <router-link to="/showReservations" v-if="isLoggedIn"> Резервации </router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  },
  mounted() {
    window.addEventListener('current-user-changed', (event) => {
      this.isLoggedIn = !!event.detail.storage.user
      this.isAdmin = event.detail.storage.isAdmin
    })

    const currentUser = localStorage.getItem('currentUser')
    const currentUserIsAdmin = localStorage.getItem('currentUserIsAdmin')
    if (currentUser) {
      this.isLoggedIn = true
      this.isAdmin = currentUserIsAdmin
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}
</style>
