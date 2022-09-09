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
  margin: 10px;
  /* background-color: maroon; */
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: auto;
  /* background-color: aqua; */
}
</style>
