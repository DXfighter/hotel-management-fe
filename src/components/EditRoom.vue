<template>
  <div>
    <h1>Edit Room</h1>
    <select @change="getRoom">
      <option selected disabled>Select room</option>
      <option v-for="room in rooms" :key="room.number" :value="room.number">
        {{ room.number }}
      </option>
    </select>
    <form @submit.prevent="editRoom">
      <label>
        Номер:
        <input type="number" v-model="room.number" disabled />
      </label>
      <label>
        Капацитет:
        <input type="number" v-model="room.capacity" />
      </label>
      <label>
        Тип:
        <input type="text" v-model="room.type" />
      </label>
      <label>
        Цена за възрастен:
        <input type="number" v-model="room.priceAdult" />
      </label>
      <label>
        Цена за дете:
        <input type="number" v-model="room.priceChild" />
      </label>
      <button type="submit" :disabled="!room.number">Редактиране на стая</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      room: {
        number: '',
        capacity: '',
        type: '',
        priceAdult: '',
        priceChild: '',
      },
      error: '',
      rooms: [],
    }
  },
  methods: {
    async editRoom() {
      try {
        const { number, capacity, type, priceAdult, priceChild } = this.room
        const response = await axios.post('http://localhost:3000/api/editRoom', {
          number,
          capacity,
          type,
          priceAdult,
          priceChild,
        })
        console.log(response.data.message)
      } catch (error) {
        console.error(error)
        this.error = 'Грешка при регистрация'
      }
    },
    async getRoom(e) {
      const number = e.target.value
      this.room = this.rooms.find((room) => room.number === number)
    },
  },
  async beforeMount() {
    const rooms = await axios.post('http://localhost:3000/api/getRooms')

    this.rooms = rooms.data
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
  opacity: 0.5;
}

button:not(:disabled) {
  cursor: pointer;
  opacity: 1;
}

button:not(:disabled):hover {
  background-color: #45a049;
}
</style>
