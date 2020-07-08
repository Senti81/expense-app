<template>
  <div id="app">
    <Navbar/>
    <Login/>
    <Expenses/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import Expenses from './components/Expenses'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    Expenses
  }
}
</script>

<style>
</style>
