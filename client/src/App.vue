<template>
  <v-app>
    <v-main>
      <MainComponent v-if="this.$store.getters.getToken"/>
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
    mounted() {
      const token = localStorage.getItem('Authorization')
      if(token) 
        this.$store.dispatch('validateToken', token)
    }
  }
</script>

