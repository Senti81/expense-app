<template>
  <v-card elevation="4" class="mx-auto">
    <v-simple-table 
      dense 
      class="mt-12"
      :class="isCurrentMonth ? 'teal lighten-5' : 'indigo lighten-4'">
      <div class="overline mx-auto text-center">{{ isCurrentMonth ? moment().format('MMMM YYYY') : moment().subtract(1, 'month').format('MMMM YYYY') }}</div>
      <tbody>
        <tr>
          <th class="text-left"><small>{{ this.$store.getters.getUserDetails.name }}</small></th>
          <th class="text-right"><small>{{calculateSumForUser}} €</small></th>
        </tr>
        <tr>
          <th class="text-left"><small>Summe</small></th>
          <th class="text-right"><small>{{calculateTotalSum}} €</small></th>
        </tr>
        <tr>
          <th class="text-left"><small>Differenz</small></th>
          <th class="text-right"
            :class="calculateDifference > 0 ? 'red--text' : 'green--text'">
            <small>{{ (Math.abs(calculateDifference)).toFixed(2) }} €</small>
          </th>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    expenseList: Array,
    isCurrentMonth: Boolean
  },
  computed: {
    ...mapGetters(['getUserDetails', 'getContribution']),
    calculateTotalSum() {
      return this.expenseList.reduce((acc, cur) => 
        acc + parseFloat(cur.amount), 0).toFixed(2)
    },
    calculateSumForUser() {
      return this.expenseList.reduce((acc, cur) => 
        cur.name === this.getUserDetails.name ? acc + parseFloat(cur.amount) : acc, 0).toFixed(2)
		},
    calculateDifference() {
      return this.calculateTotalSum /2 - this.calculateSumForUser + this.calculateContribution
    },
    calculateContribution() {
      return this.getUserDetails.role === 'ADMIN' ? -this.getContribution : this.getContribution
    }
  }
}
</script>