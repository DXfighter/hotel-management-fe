<script setup></script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link to="/registration"> Регистрация </router-link>
        <router-link to="/login"> Вход </router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
