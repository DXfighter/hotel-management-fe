<template>
  <div>
    <form @submit.prevent="loginUser" v-if="!isLoggedIn">
      <input v-model="username" type="text" placeholder="Потребителско име" />
      <input v-model="password" type="password" placeholder="Парола" />
      <button type="submit">Вход</button>
      <p>{{ errorMessage }}</p>
    </form>

    <button @click="logoutUser" v-if="isLoggedIn">Изход</button>

    <div v-if="loggedInMessage">
      {{ loggedInMessage }}
    </div>

    <div>Статус: {{ isLoggedIn ? 'Логнат' : 'Не логнат' }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      loggedInMessage: '',
      isLoggedIn: false,
      errorMessage: '',
    }
  },
  created() {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      this.isLoggedIn = true
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password,
        })

        if (response.status === 200) {
          localStorage.setItem('currentUser', response.data.user)
          localStorage.setItem('currentUserIsAdmin', response.data.role === 'admin')

          window.dispatchEvent(
            new CustomEvent('current-user-changed', {
              detail: {
                storage: {
                  user: localStorage.getItem('currentUser'),
                  isAdmin: localStorage.getItem('currentUserIsAdmin'),
                },
              },
            }),
          )

          this.isLoggedIn = true

          this.loggedInMessage = response.data.message
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.errorMessage = 'Грешно потребителско име или парола'
        } else {
          this.errorMessage = 'Възникна грешка при вход'
        }
      }
    },

    logoutUser() {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('currentUserIsAdmin')
      window.dispatchEvent(
        new CustomEvent('current-user-changed', {
          detail: {
            storage: {
              user: localStorage.getItem('currentUser'),
              isAdmin: localStorage.getItem('currentUserIsAdmin'),
            },
          },
        }),
      )
      this.isLoggedIn = false
      this.loggedInMessage = 'Излязохте успешно'
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
  top: 28%;
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
