<template>
  <form @submit.prevent="registerUser">
    <label
      >Потребителско име:
      <input type="text" v-model="username" placeholder="Потребителско име" />
    </label>
    <label
      >Парола:
      <input type="password" v-model="password" placeholder="Парола" />
    </label>
    <label
      >Име:
      <input type="text" v-model="name" placeholder="Име" />
    </label>
    <label
      >Презиме:
      <input type="text" v-model="middleName" placeholder="Презиме" />
    </label>
    <label
      >Фамилия:
      <input type="text" v-model="lastName" placeholder="Фамилия" />
    </label>
    <label
      >ЕГН:
      <input type="text" v-model="egn" placeholder="ЕГН" />
    </label>
    <label
      >Телефон:
      <input type="text" v-model="phone" placeholder="Телефон" />
    </label>
    <label
      >Емаил:
      <input type="email" v-model="email" placeholder="Емаил" />
    </label>
    <label
      >Дата на назначаване:
      <input type="date" v-model="hireDate" placeholder="Дата на назначаване" />
    </label>

    <button type="submit" :disabled="!isFormValid" :class="{ disabled: !isFormValid }">
      Регистрация
    </button>
  </form>
  <p v-if="notification">{{ notification }}</p>
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
      notification: '',
    }
  },
  computed: {
    isFormValid() {
      return (
        this.username &&
        this.password &&
        this.name &&
        this.middleName &&
        this.lastName &&
        this.egn &&
        this.phone &&
        this.email &&
        this.hireDate
      )
    },
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('http://localhost:3000/auth/register', {
          username: this.username,
          password: this.password,
          name: this.name,
          middleName: this.middleName,
          lastName: this.lastName,
          egn: this.egn,
          phoneNumber: this.phone,
          email: this.email,
          startWorkDate: this.hireDate,
          isActive: true,
        })

        this.notification = 'Успешна регистрация'
      } catch (error) {
        if (error.response.status === 400) {
          this.notification = 'Потребител с това име вече съществува'
        } else {
          this.notification = error.response.data.error
        }
      }
    },
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label > input {
  margin-left: 10px;
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

button.disabled {
  background-color: gray;
  cursor: not-allowed;
}

button:hover:not(.disabled) {
  background-color: #45a049;
}
</style>
