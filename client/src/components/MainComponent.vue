<template>
  <v-card
    class="overflow-hidden"
    min-height="100%"
    >
    <v-app-bar 
      absolute
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      color="green darken-2">
      <v-toolbar-title class="text-center">Hallo, {{this.$store.getters.getUserDetails.name}}</v-toolbar-title>
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
            <v-list-item-title>{{ this.$store.getters.getUserDetails.name}} abmelden</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col>
          <v-sheet>
            <ExpenseSummary 
              :isCurrentMonth="false"
              :expenseList="getExpensesLastMonth"
            />          
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet>
            <ExpenseSummary 
              isCurrentMonth
              :expenseList="getExpensesCurrentMonth"
            />          
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ExpensesList,
    AddExpense,
    ExpenseSummary,
  },
  computed: {
    ...mapGetters(['getExpensesCurrentMonth', 'getExpensesLastMonth']),
    ...mapActions(['setExpenses'])
  },
  methods: {    
    logout() {
      this.$store.commit('logout')
    },
  },
  mounted() {
    this.setExpenses
	},
}
</script>