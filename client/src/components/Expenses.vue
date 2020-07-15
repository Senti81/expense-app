<template>
  <v-simple-table class="expenseTable">
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
			<tbody>
        <tr>
          <th class="text-left">{{userName}}</th>
          <th class="text-left"></th>
          <th class="text-right">
						<strong> {{calculateSumForUser}} € </strong>	
					</th>
        </tr>
      </tbody>
			<tbody>
        <tr>
          <th class="text-left">Total</th>
          <th class="text-left"></th>
          <th class="text-right">
						<strong> {{calculateTotalSum}} € </strong>	
					</th>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main'

export default {
	props: {
		userName: String
	},
	data() {
		return {
			expenses: [],
			filtered: []
		}
	},
	computed: {
		calculateTotalSum() {
			return this.expenses.reduce((acc, cur) => acc + parseFloat(cur.amount), 0).toFixed(2)
		},
		calculateSumForUser() {
			return this.expenses.reduce((acc, cur) => cur.name === this.userName ? acc + parseFloat(cur.amount) : acc, 0).toFixed(2)
		}
	},
	methods: {
		async loadExpenses() {
			const tokenFromStorage = localStorage.getItem('Authorization')
			if(tokenFromStorage) {
				try {
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