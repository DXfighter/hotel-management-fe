<template>
  <!-- Форма за регистрацията -->
  <form @submit.prevent="registerUser">
    <!-- Вашите полета за въвеждане на информацията -->
    <input type="text" v-model="username" placeholder="Потребителско име" />
    <input type="password" v-model="password" placeholder="Парола" />
    <!-- Бутон за регистрация -->
    <button type="submit">Регистрация</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username: this.username,
          password: this.password
        });

        // Обработка на успешната регистрация
        console.log(response.data.message);
      } catch (error) {
        // Обработка на грешките при регистрацията
        console.error(error.response.data.error);
      }
    }
  }
};
</script>

<!-- Стилове и други компоненти -->
