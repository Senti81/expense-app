<template>
  <v-app>
    <v-main>
      <MainComponent v-if="hasToken"/>
      <Login v-else/>
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

