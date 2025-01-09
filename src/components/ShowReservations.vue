<template>
  <div>
    <h1>Reservations</h1>
    <table>
      <thead>
        <tr>
          <th>Room</th>
          <th>Clients</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Breakfast</th>
          <th>All inclusive</th>
          <th>Total Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="res in reservations" :key="res.id">
          <td>
            {{ res.room }}
          </td>
          <td>
            {{ res.clients.map((client) => `${client.name} ${client.lastName}`).join(', ') }}
          </td>
          <td>
            {{ new Date(res.startDate).toISOString().split('T')[0] }}
          </td>
          <td>
            {{ new Date(res.endDate).toISOString().split('T')[0] }}
          </td>
          <td>
            {{ res.includeBreakfast ? 'Yes' : 'No' }}
          </td>
          <td>
            {{ res.allInclusive ? 'Yes' : 'No' }}
          </td>
          <td>
            {{ res.price }}
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
      reservations: [],
    }
  },
  async beforeMount() {
    const reservations = await axios.post('http://localhost:3000/api/getReservations')

    this.reservations = reservations.data
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
