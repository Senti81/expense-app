<template>
  <v-card  class="overflow-hidden">
    <v-app-bar
      absolute
      color="green darken-2"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{moment().format('MMMM YYYY')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <AddExpense :token="token"/>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
        <h3>{{userName}}</h3>
        <hr>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      max-height="800px"
    >
      <v-container style="height: 1000px; margin-top=60px;">
        <Expenses :userName="userName"/>            
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import Expenses from './Expenses'
import AddExpense from './AddExpense'
import { eventBus } from '../main'

export default {
  components: {
    Expenses,
    AddExpense
  },
  props: {
    userName: String,
    token: String
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    logout() {
      eventBus.$emit('logout')
    },
  }
}
</script>