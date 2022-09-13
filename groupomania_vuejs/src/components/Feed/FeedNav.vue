<template>
  <div class="menu">
    <!-- faire lien vers page perso  -->
    <router-link to="/profil">Profil</router-link>
    <router-link to="/feed">Actualités</router-link>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "FeedNav",
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  padding: 3px 3px;
}
a {
  color: #84868e;
  padding: 5px;
}
a:hover {
  background-color: #fd2d01;
  color: #fff;
  width: 80%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
