<template>
  <v-simple-table dense >
    <tbody>
      <tr>
        <th class="text-left">{{userName}}</th>
        <th class="text-left"></th>
        <th class="text-right">
          <strong>{{calculateSumForUser}} €</strong>	
        </th>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th class="text-left">Total</th>
        <th class="text-left"></th>
        <th class="text-right">
          <strong>{{calculateTotalSum}} €</strong>	
        </th>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    userName: String,
    calculateTotalSum: String,
    calculateSumForUser: String
  }  
}
</script>