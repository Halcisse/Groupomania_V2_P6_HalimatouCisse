<template>
  <h1>SINGLE</h1>
</template>

<script>
export default {
  name: "SinglePost",
  props: {
    post: Object,
  },
};
</script>
<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* background-color: red; */
}
.postMessage {
  /* background-color: blue; */
  height: 100%;
}
.postItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
img {
  /* background-color: green; */
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
