<template>
  <div id="app">
    <Navbar/>
    <Login/>
    <AxiosTest/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import AxiosTest from './components/AxiosTest'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    AxiosTest
  }
}
</script>

<style>
</style>
