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
          <tr v-for="item in getExpenseListForCurrentMonth" :key="item.id">
            <td class="text-left">
              <v-icon
                v-if="getUserDetails.role === 'ADMIN'"
                small
                @click="deleteExpense(item.id)">
                mdi-delete
              </v-icon>
              <v-icon
                v-if="item.name === getUserDetails.name || getUserDetails.role === 'ADMIN'"
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
import moment from 'moment'

export default {
  computed: {
    getUserDetails() {
      return this.$store.getters.getUserDetails
    },
    getExpenseListForCurrentMonth() {
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()+1
      return this.$store.getters.getExpenses.filter( function(expense) {
        return moment(expense.created_at).format('Y') == currentYear && moment(expense.created_at).format('M') == currentMonth
      })
    }
  },
  methods: {
    async deleteExpense(id) {
      try {
        await axios.delete(`api/expenses/${id}`, {
          headers: { 'Authorization': this.$store.getters.getToken}
        })
        this.$store.dispatch('updateExpenses')        
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