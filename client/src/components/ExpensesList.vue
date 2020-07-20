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
            <th class="text-left">Name</th>
            <th class="text-left">Date</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in expenses" :key="item.id">
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ moment(item.created_at).format('DD.MM.YYYY HH:mm') }}</td>
            <td class="text-right">{{ item.amount }} €</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
	props: {
		expenses: Array
  }
}
</script>