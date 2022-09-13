<!-- app.vue est le point d'entrée de l'application -->
<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* background-color: aqua; */
}
a,
button {
  text-decoration: none;
  font-family: "Lato", sans-serif;
  color: #bebfcb;
  transition: 0.2s;
}
</style>
