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
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
        <v-list>
          <v-list-item @click="logout">
            <v-btn icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-list-item-title>Logout {{ this.$store.getters.getUserDetails.name }}</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu>
    </v-app-bar>

    <!-- ExpenseSummary -->
    <v-container>
      <v-row>
        <v-col>
          <v-sheet>
            <ExpenseSummary 
              :isCurrentMonth="false"
              :expenseList="getExpenseListForLastMonth"
            />          
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet>
            <ExpenseSummary 
              isCurrentMonth
              :expenseList="getExpenseListForThisMonth"
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
      <ExpensesList/>            
    </v-sheet>
    <AddExpense/>
  </v-card>
</template>

<script>
import ExpensesList from './ExpensesList'
import AddExpense from './AddExpense'
import ExpenseSummary from './ExpenseSummary'

export default {
  components: {
    ExpensesList,
    AddExpense,
    ExpenseSummary,
  },
  computed: {
    getExpenseListForThisMonth() {
      return this.$store.getters.getExpensesCurrentMonth
    },
    getExpenseListForLastMonth() {
      return this.$store.getters.getExpensesLastMonth
    },
  },
  methods: {    
    logout() {
      this.$store.commit('logout')
    },
  },
  mounted() {
    this.$store.dispatch('updateExpenses')
    this.$store.dispatch('loadExpensesFromLastMonth')
	},
}
</script>