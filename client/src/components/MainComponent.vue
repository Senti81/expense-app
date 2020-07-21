<template>
  <v-card
    class="overflow-hidden">

    <!-- NavigationBar -->
    <v-app-bar 
      absolute
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      color="green darken-2">
      <v-toolbar-title>{{moment().format('MMMM YYYY')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu right top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
        <v-list>
          <v-list-item @click="logout">
            <v-btn icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-list-item-title>Logout {{ userName }}</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu>
    </v-app-bar>

    <!-- ExpenseSummary -->
    <v-container>
      <v-row>
        <v-col>
          <v-sheet max-height="150px">
            <ExpenseSummary
              :currentMonth="currentMonth"
              :userName="userName"
              :calculateTotalSum="calculateTotalSum"
              :calculateSumForUser="calculateSumForUser"
            />          
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet max-height="150px">
            <ExpenseSummary              
              :userName="userName"
              :calculateTotalSumForPreviousMonth="calculateTotalSumForPreviousMonth"
              :calculateSumForUserForPreviousMonth="calculateSumForUserForPreviousMonth"
            />       
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- ExpenseList -->
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="100%"
    >  
      <ExpensesList
        :userName="userName"
        :role="role"
        :token="token"
        :expenses="expenses"
      />            
    </v-sheet>
    <AddExpense :token="token"/>
  </v-card>
</template>

<script>
import ExpensesList from './ExpensesList'
import AddExpense from './AddExpense'
import ExpenseSummary from './ExpenseSummary'

import axios from 'axios'
import { eventBus } from '../main'
import moment from 'moment'

export default {
  components: {
    ExpensesList,
    AddExpense,
    ExpenseSummary
  },
  props: {
    userName: String,
    role: String,
    token: String
  },
  data() {
    return {
      currentMonth: moment().format('MMMM YYYY'),
      expenses: [],
      previousExpenses: []
    }
  },
  methods: {
    async loadExpenses() {
			const tokenFromStorage = localStorage.getItem('Authorization')
			if(tokenFromStorage) {
				try {
					const response = await axios.get('api/expenses/current', {
						headers: { 'Authorization': tokenFromStorage}
					})
					this.expenses = response.data
					const previousExpensesResponse = await axios.get('api/expenses/last', {
						headers: { 'Authorization': tokenFromStorage}
					})
					this.previousExpenses = previousExpensesResponse.data
				} catch (error) {
					localStorage.clear();
				}
			}
		},
    logout() {
      eventBus.$emit('logout')
    },
  },
  computed: {
		calculateTotalSum() {
			return this.expenses.reduce((acc, cur) => acc + parseFloat(cur.amount), 0).toFixed(2)
		},
		calculateSumForUser() {
			return this.expenses.reduce((acc, cur) => cur.name === this.userName ? acc + parseFloat(cur.amount) : acc, 0).toFixed(2)
		},
		calculateTotalSumForPreviousMonth() {
			return this.previousExpenses.reduce((acc, cur) => acc + parseFloat(cur.amount), 0).toFixed(2)
		},
		calculateSumForUserForPreviousMonth() {
			return this.previousExpenses.reduce((acc, cur) => cur.name === this.userName ? acc + parseFloat(cur.amount) : acc, 0).toFixed(2)
		}
  },
	created() {
		eventBus.$on('update expenses', () => this.loadExpenses())
	},
  mounted() {
		this.loadExpenses()            
	},
}
</script>