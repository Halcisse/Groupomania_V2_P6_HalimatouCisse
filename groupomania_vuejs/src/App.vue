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
  border: 1px solid GREEN;
  height: 100%;
  /* background-color: aqua; */
}
</style>
