<template>
  <v-app>
    <v-main>
      <AppNav v-if="loggedIn"
        :userName="userName"
        :token="token"
      />
      <div class="container">
        <Login v-if="!loggedIn"/>        
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login'
import AppNav from './components/AppNav'

import axios from 'axios'
import { eventBus } from './main'

export default {
  name: 'App',
  components: {
    AppNav,
    Login,
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

