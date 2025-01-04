<template>
  <div>
    <h1>Register Client</h1>
    <form @submit.prevent="registerCl">
      <label>
        Име:
        <input type="text" v-model="name" />
      </label>
      <label>
        Презиме:
        <input type="text" v-model="lastName" />
      </label>
      <label>
        ЕГН:
        <input type="text" v-model="egn" />
      </label>
      <label>
        Телефон:
        <input type="text" v-model="phoneNumber" />
      </label>
      <label>
        Е-mail:
        <input type="email" v-model="email" />
      </label>
      <button type="submit">Регистрация</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      lastName: '',
      egn: '',
      phoneNumber: '',
      email: '',
      error: '',
    }
  },
  methods: {
    async registerCl() {
      try {
        const response = await axios.post('http://localhost:3000/api/registerClient', {
          name: this.name,
          lastName: this.lastName,
          egn: this.egn,
          phoneNumber: this.phoneNumber,
          email: this.email,
        })
        console.log(response.data.message)
      } catch (error) {
        console.error(error)
        this.error = 'Грешка при регистрация'
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
