<template>
  <v-app>
    <v-main>
      <MainComponent v-if="isLoggedIn"/>
      <div class="container">
        <Login v-if="!isLoggedIn"/>        
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import Login from './components/Login'
  import MainComponent from './components/MainComponent'

  export default {
    name: 'App',
    components: {
      MainComponent,
      Login,
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      }
    },
    mounted() {
      const token = localStorage.getItem('Authorization')
      if(token) 
        this.$store.dispatch('validateToken', token) 
    }
  }
</script>

