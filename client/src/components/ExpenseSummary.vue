<template>
  <v-card elevation="4" class="mx-4">
    <v-simple-table dense class="mt-16">
    <div class="overline mx-auto text-center">{{ moment().format('MMMM YYYY') }}</div>
      <tbody>
        <tr>
          <th class="text-left">{{ this.$store.getters.getUserDetails.name }}</th>
          <th class="text-right">{{calculateSumForUser}} €</th>
        </tr>
        <tr>
          <th class="text-left">Total</th>
          <th class="text-right">{{calculateTotalSum}} €</th>
        </tr>
        <tr>
          <th class="text-left">Difference</th>
          <th class="text-right"
            :class="calculateDifference > 0 ? 'red--text' : 'green--text'">
            {{ (Math.abs(calculateDifference)).toFixed(2) }} €
          </th>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    getExpenseListForCurrentMonth() {
      return this.$store.getters.getExpenses.filter((expense) => 
        moment(expense.created_at).format('Y') == new Date().getFullYear() &&
        moment(expense.created_at).format('M') == new Date().getMonth()+1
      )
    },
    calculateTotalSum() {
      return this.getExpenseListForCurrentMonth.reduce((acc, cur) => 
        acc + parseFloat(cur.amount), 0).toFixed(2)
    },
    calculateSumForUser() {
      return this.getExpenseListForCurrentMonth.reduce((acc, cur) => 
        cur.name === this.$store.getters.getUserDetails.name ? acc + parseFloat(cur.amount) : acc, 0).toFixed(2)
		},
    calculateDifference() {
      return (this.calculateTotalSum)/2 - (this.calculateSumForUser)
    }
  }
}
</script>