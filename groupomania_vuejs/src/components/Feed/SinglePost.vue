<template>
  <div class="post">
    <p>post single</p>
    <div class="postMessage">{{ post.message }}</div>
    <img :src="post.imageUrl" />

    <div class="postItem">
      <div class="iconLikes">
        <icon icon="thumbs-up" /> <icon icon="thumbs-down" />
      </div>
      <div class="iconUpdate">
        <router-link :to="{ name: 'delete', params: { id: post._id } }">
          <icon icon="trash-can" />
        </router-link>
        <router-link :to="{ name: 'edit', params: { id: post._id } }">
          <icon icon="eraser" />
        </router-link>
      </div>
    </div>
  </div>
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
