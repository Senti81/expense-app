<template>
  <v-card
    elevation="4"
    class="mx-4 green lighten-4"
    >
    <v-simple-table
      fixed-header
      height="400px"
      dense
      class="expenseTable mt-6"
      >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"><v-icon>mdi-menu</v-icon></th>
            <th class="text-left">Name</th>
            <th class="text-left">Date</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in expenses" :key="item.id">
            <td class="text-left">
              <v-icon
                v-if="role === 'ADMIN'"
                small
                @click="deleteExpense(item.id)">
                mdi-delete
              </v-icon>
              <v-icon
                v-if="item.name === userName || role === 'ADMIN'"
                small
                @click="updateExpense(item.id)">
                mdi-file-edit
              </v-icon>
            </td>
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ moment(item.created_at).format('DD.MM.YYYY') }}</td>
            <td class="text-right">{{ item.amount }} €</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'

export default {
	props: {
    expenses: Array,
    role: String,
    userName: String,
    token: String
  },
  methods: {
    async deleteExpense(id) {
      try {
        await axios.delete(`api/expenses/${id}`, {
          headers: { 'Authorization': this.token}
        })
        eventBus.$emit('update expenses')        
      } catch (error) {
        console.log(error)
      }
    },
    async updateExpense(id) {
      console.log(`Update Expense ${id}`)
    }   
  }
}
</script>