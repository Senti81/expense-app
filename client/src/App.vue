<template>
  <div id="app">
    <Navbar/>
    <Login/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Navbar,
    Login    
  }
}
</script>

<style>
</style>
