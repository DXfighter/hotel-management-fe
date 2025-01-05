<template>
  <div>
    <h1>Register Room</h1>
    <form @submit.prevent="registerRoom">
      <label>
        Номер:
        <input type="text" pattern="[0-9]+" v-model="number" />
      </label>
      <label>
        Капацитет:
        <input type="number" v-model="capacity" />
      </label>
      <label>
        Тип:
        <input type="text" v-model="type" />
      </label>
      <label>
        Цена за възрастен:
        <input type="number" v-model="adultPrice" />
      </label>
      <label>
        Цена за дете:
        <input type="number" v-model="childPrice" />
      </label>
      <button type="submit">Създаване на стая</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      number: '',
      capacity: 0,
      type: '',
      adultPrice: 0,
      childPrice: 0,
      error: '',
    }
  },
  methods: {
    async registerRoom() {
      try {
        const response = await axios.post('http://localhost:3000/api/registerRoom', {
          number: this.number,
          capacity: this.capacity,
          type: this.type,
          priceAdult: this.adultPrice,
          priceChild: this.childPrice,
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
