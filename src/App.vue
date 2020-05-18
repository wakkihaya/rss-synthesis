<template>
  <div id="app">
    <Header></Header>
    <Home></Home>
  </div>
</template>

<script>
import Home from './components/index.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Home,
    Header
  }
}
</script>

<style>
#app, body, html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
