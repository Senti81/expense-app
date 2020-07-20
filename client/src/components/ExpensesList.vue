<template>
  <v-simple-table
		fixed-header
		height="400"
		dense
		class="expenseTable"
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
        <tr v-for="item in expenses" :key="item.created_at">
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ moment(item.created_at).format('DD.MM.YYYY HH:mm') }}</td>
          <td class="text-right">{{ item.amount }} €</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
	props: {
		expenses: Array
	}
}
</script>

<style scoped>
	.expenseTable {
		margin-top: 5em;
	}
</style>