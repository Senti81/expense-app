<template>
  <v-card
    elevation="4"
    class="mx-4"
    >
    <v-simple-table dense class="mt-16">
      <tbody>
        <tr>
          <th class="text-left">{{userName}}</th>
          <th class="text-right">{{calculateSumForUser}} €</th>
        </tr>
        <tr>
          <th class="text-left">💲</th>
          <th class="text-right">{{calculateTotalSum}} €</th>
        </tr>
        <tr>
          <th class="text-left">💵 - 💲</th>
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
    userName: String,
    calculateTotalSum: String,
    calculateSumForUser: String
  },
  computed: {
    calculateDifference() {
      return this.calculateTotalSum/2 - this.calculateSumForUser
    }
  }
}
</script>