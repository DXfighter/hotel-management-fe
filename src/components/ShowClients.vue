<template>
  <div>
    <h1>Clients</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Adult</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>
            {{ client.name }}
          </td>
          <td>
            {{ client.lastName }}
          </td>
          <td>
            {{ client.phoneNumber }}
          </td>
          <td>
            {{ client.email }}
          </td>
          <td>
            {{ client.isAdult ? 'Yes' : 'No' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      clients: [],
    }
  },
  async beforeMount() {
    const clients = await axios.post('http://localhost:3000/api/getClients')

    this.clients = clients.data
  },
}
</script>
<style scoped>
table {
  margin-inline: auto;
  border-collapse: collapse;
}

th,
td {
  padding-inline: 12px;
  border-right: 1px solid #000;
}
</style>
