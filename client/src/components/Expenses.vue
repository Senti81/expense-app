<template>
  <v-simple-table class="expenseTable">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in expenses" :key="item.created_at">
          <td>{{ item.Name }}</td>
          <td>{{ item.amount }} €</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main'

export default {
	data() {
		return {
			expenses: [],
			show: true
		}
	},
	methods: {
		async loadExpenses() {
			const tokenFromStorage = localStorage.getItem('Authorization')
			if(tokenFromStorage) {
				try {
					this.show = false;
					const response = await axios.get('api/expenses', {
						headers: { 'Authorization': tokenFromStorage}
					})
					this.expenses = response.data
				} catch (error) {
					localStorage.clear();
				}
			}
		}
	},
	mounted() {
		this.loadExpenses()            
	},
	created() {
		eventBus.$on('update expenses', () => this.loadExpenses())
	}
}
</script>

<style scoped>
	.expenseTable {
		margin-top: 5em;
	}
</style>