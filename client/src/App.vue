<template>
  <div id="app">
    <Navbar :loggedIn="loggedIn"/>
    <Login v-if="!loggedIn"/>
    <Expenses v-if="loggedIn"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import Expenses from './components/Expenses'

import { eventBus } from './main'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    Expenses
  },
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    async validateToken() {
      const tokenFromStorage = localStorage.getItem('Authorization')
      if(tokenFromStorage) {
        try {
          this.loggedIn = true
        } catch (error) {
          localStorage.removeItem('Authorization')
        }
      }
    },
  },
  created() {
    eventBus.$on('login successful', () => {
      this.loggedIn = true 
    })
    eventBus.$on('logout', () => {
      localStorage.removeItem('Authorization')
      this.loggedIn = false
    })
  },
  mounted() {
    this.validateToken()
  }
}
</script>

<style>
</style>
