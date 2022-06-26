<template>
  <div id="app">
    <!-- <screen /> -->
    <router-view></router-view>
  </div>
</template>

<script>
 import Screen from './views/Screen'

 export default {
   components: {
     Screen
   }
 }
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
