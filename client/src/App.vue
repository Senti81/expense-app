<template>
  <div id="app">
    <Navbar 
      :loggedIn="loggedIn"
      :userName="userName"
      :token="token"
      />
    <Login v-if="!loggedIn"/>
    <Expenses v-if="loggedIn"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import Expenses from './components/Expenses'

import axios from 'axios'

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
      loggedIn: false,
      userName: '',
      token: ''
    }
  },
  methods: {
    async validateToken() {
      this.jwtToken = localStorage.getItem('Authorization')
      if(this.jwtToken) {
        try {
          this.loggedIn = true
          eventBus.$emit('login', this.jwtToken)
        } catch (error) {
          localStorage.removeItem('Authorization')
        }
      }
    },
  },
  created() {
    eventBus.$on('login', async (token) => {
      this.token = token
      this.loggedIn = true
      const userDetails = await axios.get('/api/auth', {
        headers: { 'Authorization': token }
      })
      this.userName = userDetails.data.name
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
