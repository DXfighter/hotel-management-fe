<template>
  <div>
    <h1>Create Reservation</h1>
    <form @submit.prevent="createReservation">
      <label>
        Клиенти:
        <select v-model="clientIds" multiple>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.name }}
          </option>
        </select>
      </label>
      <label>
        Дата на настаняване:
        <input type="date" v-model="startDate" />
      </label>
      <label>
        Дата на освобождаване:
        <input type="date" v-model="endDate" />
      </label>
      <label>
        Стая:
        <select v-model="roomId" :disabled="rooms.length === 0">
          <option disabled selected value="">Select room</option>
          <option v-for="room in rooms" :key="room.id" :value="room.id">
            {{ room.number }}
          </option>
        </select>
      </label>
      <label>
        Включена закуска:
        <input type="checkbox" v-model="includeBreakfast" />
      </label>
      <label>
        All inclusive:
        <input type="checkbox" v-model="allInclusive" />
      </label>
      <button type="submit">Резервиране</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      roomId: '',
      clientIds: [],
      startDate: '',
      endDate: '',
      includeBreakfast: false,
      allInclusive: false,
      error: '',
      rooms: [],
      clients: [],
    }
  },
  methods: {
    async fetchAvailableRooms() {
      try {
        if (this.startDate && this.endDate) {
          const response = await axios.post('http://localhost:3000/api/getAvailableRooms', {
            startDate: this.startDate,
            endDate: this.endDate,
          })
          this.rooms = response.data
        }
      } catch (error) {
        console.error(error)
        this.error = 'Грешка при получаване на наличните стаи'
      }
    },
    // Fetch clients before the component is mounted
    async fetchCl() {
      try {
        const clientsResponse = await axios.post('http://localhost:3000/api/getClients')
        this.clients = clientsResponse.data
      } catch (error) {
        console.error(error)
        this.error = 'Грешка при получаване на клиентите'
      }
    },
    async createReservation() {
      try {
        const response = await axios.post('http://localhost:3000/api/createReservation', {
          room: this.roomId,
          user: localStorage.getItem('currentUser'),
          clients: this.clientIds,
          startDate: this.startDate,
          endDate: this.endDate,
          includeBreakfast: this.includeBreakfast,
          allInclusive: this.allInclusive,
        })
        alert('Резервацията е успешно създадена!')
        console.log(response.data)
        this.resetForm()
      } catch (error) {
        console.error(error)
        this.error = 'Регистрацият е неуспешна,моля проверете въведените данни'
      }
    },
    resetForm() {
      this.roomId = ''
      this.clientIds = []
      this.startDate = ''
      this.endDate = ''
      this.includeBreakfast = false
      this.allInclusive = false
      this.error = ''
      this.rooms = []
    },
  },
  watch: {
    startDate() {
      this.fetchAvailableRooms()
    },
    endDate() {
      this.fetchAvailableRooms()
    },
  },
  async beforeMount() {
    await this.fetchCl()
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

label:has(select[multiple]) {
  display: flex;
  flex-direction: column;
}

select[multiple] {
  min-width: 180px;
  min-height: 72px;
}
</style>
