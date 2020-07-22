<template>
  <v-app>
    <v-main>
      <MainComponent v-if="hasToken"/>
      <div v-else class="container">
        <Login/>
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
      hasToken() {
        return this.$store.getters.getToken
      }
    },
    mounted() {
      const token = localStorage.getItem('Authorization')
      if(token) 
        this.$store.dispatch('validateToken', token)
    }
  }
</script>

