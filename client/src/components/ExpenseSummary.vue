<template>
  <v-card
    elevation="4"
    class="mx-4"
    >
    <v-simple-table dense class="mt-16">
    <div class="overline mx-auto text-center">{{currentMonth || 'Last Month'}}</div>
      <tbody>
        <tr>
          <th class="text-left">{{userName}}</th>
          <th class="text-right">{{calculateSumForUser || this.$attrs.calculateSumForUserForPreviousMonth}} €</th>
        </tr>
        <tr>
          <th class="text-left">Total</th>
          <th class="text-right">{{calculateTotalSum || this.$attrs.calculateTotalSumForPreviousMonth}} €</th>
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
export default {
  props: {
    currentMonth: String,
    userName: String,
    calculateTotalSum: String,
    calculateSumForUser: String
  },
  computed: {
    calculateDifference() {
      return (this.calculateTotalSum || this.$attrs.calculateTotalSumForPreviousMonth)/2 - (this.calculateSumForUser || this.$attrs.calculateSumForUserForPreviousMonth)
    }
  }
}
</script>