<template>
  <h1>LOLO</h1>
</template>

<script>
export default {
  name: "displayPost",
  computed: {
    displayPost() {
      return this.$store.getters["StorePost/displayPost"];
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid pink;
  color: pink;
  height: 100%;
}
</style>
