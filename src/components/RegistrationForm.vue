<template>
  <!-- Форма за регистрацията -->
  <form @submit.prevent="registerUser">
    <!-- Вашите полета за въвеждане на информацията -->
    <input type="text" v-model="username" placeholder="Потребителско име" />
    <input type="password" v-model="password" placeholder="Парола" />
    <input type="text" v-model="name" placeholder="Име" />
    <input type="text" v-model="middleName" placeholder="Презиме" />
    <input type="text" v-model="lastName" placeholder="Фамилия" />
    <input type="text" v-model="egn" placeholder="ЕГН" />
    <input type="text" v-model="phone" placeholder="Телефон" />
    <input type="email" v-model="email" placeholder="Емаил" />
    <input type="date" v-model="hireDate" placeholder="Дата на назначаване" />
    <input type="text" v-model="role" placeholder="Роля" />

    <!-- Бутон за регистрация -->
    <button type="submit">Регистрация</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      name: '',
      middleName: '',
      lastName: '',
      egn: '',
      phone: '',
      email: '',
      hireDate: '',
      role: '',
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username: this.username,
          password: this.password,
          name: this.name,
          middleName: this.middleName,
          lastName: this.lastName,
          egn: this.egn,
          phone: this.phone,
          email: this.email,
          hireDate: this.hireDate,
          role: this.role,
        })

        // Обработка на успешната регистрация
        console.log(response.data.message)
      } catch (error) {
        // Обработка на грешките при регистрацията
        console.error(error.response.data.error)
      }
    },
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 400px;
  background-color: #f9f9f9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type='text'],
input[type='password'],
input[type='email'],
input[type='date'] {
  display: block;
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  display: block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
