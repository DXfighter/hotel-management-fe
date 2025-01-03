<template>
  <div>
    <!-- Форма за вход -->
    <form @submit.prevent="loginUser" v-if="!isLoggedIn">
      <input v-model="username" type="text" placeholder="Потребителско име" />
      <input v-model="password" type="password" placeholder="Парола" />
      <button type="submit">Вход</button>
      <p>{{ errorMessage }}</p> <!-- Извеждане на грешката -->
    </form>

    <!-- Форма за изход -->
    <button @click="logoutUser" v-if="isLoggedIn">Изход</button>
    
    <!-- Изписване на съобщение след успешен вход -->
    <div v-if="loggedInMessage">
      {{ loggedInMessage }}
    </div>
    
    <!-- Състояние на логина -->
    <div>
      Статус: {{ isLoggedIn ? 'Логнат' : 'Не логнат' }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loggedInMessage: '',
      isLoggedIn: false,
      errorMessage: '',
    };
  },
  created() {
    // Проверка при зареждане на компонента за наличие на токен и логин
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    // Конфигурирайте пътя за вход във вашия Vue.js компонент
    async loginUser() {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: this.username,
      password: this.password,
    });

    // Проверка за успешен вход
    if (response.status === 200) {
      // Задайте JWT токена в локалното съхранение
      localStorage.setItem('jwtToken', response.data.token);
      // Променете стойността на isLoggedIn на true
      this.isLoggedIn = true;
      // Изпишете съобщението след успешен вход
      this.loggedInMessage = response.data.message;
    }
  } catch (error) {
    // Обработка на грешката
    if (error.response.status === 401) {
      // Грешно потребителско име или парола
      this.errorMessage = 'Грешно потребителско име или парола';
    } else {
      // Други грешки
      this.errorMessage = 'Възникна грешка при вход';
    }
  }
},


    logoutUser() {
      // Тук добавете логика за изход - например, изчистване на токена и връщане на статуса на "не логнат"
      localStorage.removeItem('jwtToken');
      this.isLoggedIn = false;
      this.loggedInMessage = 'Излязохте успешно'; // Можете да изпишете подходящо съобщение
    },
  },
};
</script>
