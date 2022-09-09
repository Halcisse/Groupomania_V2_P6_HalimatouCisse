<!-- app.vue est le point d'entrée de l'application -->
<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
</script>

<style>
body {
  height: 100%;
}
#app {
  height: 100%;
  /* background-color: aqua; */
}
a {
  text-decoration: none;
  font-family: "Lato", sans-serif;
  color: #bebfcb;
  transition: 0.2s;
}
</style>
