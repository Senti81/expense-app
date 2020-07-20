<template>
  <v-card class="overflow-hidden">
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
        <v-list>
          <v-list-item>
            <v-btn icon>
              <v-icon>mdi-format-list-bulleted </v-icon>
            </v-btn>
            <v-list-item-title @click="() => {}">Dummy</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >  
      <Expenses :token="token" :userName="userName"/>            
    </v-sheet>
    <v-sheet max-height="100">
      <ExpenseSummary/>
    </v-sheet>
    <AddExpense :token="token"/>
  </v-card>
</template>

<script>
import Expenses from './Expenses'
import AddExpense from './AddExpense'
import ExpenseSummary from './ExpenseSummary'
import { eventBus } from '../main'

export default {
  components: {
    Expenses,
    AddExpense,
    ExpenseSummary
  },
  props: {
    userName: String,
    token: String
  },
  methods: {
    logout() {
      eventBus.$emit('logout')
    },
  }
}
</script>