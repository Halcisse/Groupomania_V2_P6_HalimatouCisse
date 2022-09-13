<template>
  <div v-if="error">{{ error }}</div>
  <SinglePost
    v-else
    v-for="post in posts.slice().reverse()"
    :key="post.id"
    :post="post"
    class="post_card"
  />
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
const SinglePost = defineAsyncComponent(() => import("./SinglePost.vue"));

export default {
  name: "displayPost",
  async setup() {
    const posts = ref(null);
    const error = ref(null);
    try {
      let token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      posts.value = await response.json();
    } catch (e) {
      error.value = e;
    }

    return { posts, error };
  },
  components: { SinglePost },
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
