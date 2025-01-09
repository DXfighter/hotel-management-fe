<template>
  <div>
    <h1>Edit User</h1>
    <select @change="getUser">
      <option selected disabled>Select user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.username }}
      </option>
    </select>
    <form @submit.prevent="editUser">
      <label
        >Потребителско име:
        <input type="text" v-model="user.username" placeholder="Потребителско име" />
      </label>
      <label
        >Име:
        <input type="text" v-model="user.name" placeholder="Име" />
      </label>
      <label
        >Презиме:
        <input type="text" v-model="user.middleName" placeholder="Презиме" />
      </label>
      <label
        >Фамилия:
        <input type="text" v-model="user.lastName" placeholder="Фамилия" />
      </label>
      <label
        >ЕГН:
        <input type="text" v-model="user.egn" placeholder="ЕГН" />
      </label>
      <label
        >Телефон:
        <input type="text" v-model="user.phoneNumber" placeholder="Телефон" />
      </label>
      <label
        >Емаил:
        <input type="email" v-model="user.email" placeholder="Емаил" />
      </label>
      <label
        >Дата на назначаване:
        <input type="date" v-model="user.startWorkDate" placeholder="Дата на назначаване" />
      </label>
      <label
        >Активен:
        <input type="checkbox" v-model="user.isActive" />
      </label>
      <label
        >Дата на освобождаване:
        <input
          type="date"
          v-model="user.endWorkDate"
          :required="!user.isActive"
          placeholder="Дата на освобождаване"
        />
      </label>
      <button type="submit" :disabled="!user.id">Редактиране на потребител</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        id: '',
        username: '',
        name: '',
        middleName: '',
        lastName: '',
        egn: '',
        phoneNumber: '',
        email: '',
        startWorkDate: '',
        endWorkDate: '',
        isActive: false,
      },
      error: '',
      users: [],
    }
  },
  methods: {
    async editUser() {
      try {
        const {
          id,
          username,
          name,
          middleName,
          lastName,
          egn,
          phoneNumber,
          email,
          startWorkDate,
          endWorkDate,
          isActive,
        } = this.user

        const parsedStartWorkDate = startWorkDate ? startWorkDate : null
        const parsedEndWorkDate = endWorkDate ? endWorkDate : null

        const response = await axios.post('http://localhost:3000/api/editUser', {
          id,
          username,
          name,
          middleName,
          lastName,
          egn,
          phoneNumber,
          email,
          startWorkDate: parsedStartWorkDate,
          endWorkDate: parsedEndWorkDate,
          isActive,
        })
        console.log(response.data.message)
      } catch (error) {
        console.error(error)
        this.error = 'Грешка при редактиране'
      }
    },
    async getUser(e) {
      const id = e.target.value
      this.user = this.users.find((user) => parseInt(user.id) === parseInt(id))

      this.user.startWorkDate = this.user.startWorkDate
        ? new Date(this.user.startWorkDate).toISOString().split('T')[0]
        : null
      this.user.endWorkDate = this.user.endWorkDate
        ? new Date(this.user.endWorkDate).toISOString().split('T')[0]
        : null
    },
  },
  async beforeMount() {
    const users = await axios.post('http://localhost:3000/api/getUsers')

    this.users = users.data
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
  margin-top: 42px;
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
