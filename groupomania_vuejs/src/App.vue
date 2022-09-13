<!-- app.vue est le point d'entrée de l'application -->
<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: auto 2px;
  /* background-color: aqua; */
}
a,
button {
  text-decoration: none;
  font-family: "Lato", sans-serif;
  color: #bebfcb;
  transition: 0.2s;
  margin-bottom: 9px;
}
</style>
