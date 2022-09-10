<template>
  <HomeHeader /> <br />
  <div class="home">
    <div class="home-pic">
      <img
        src="../assets/groupo-img.jpg"
        alt="illustration du logo groupomania"
      />
      <h1>Rejoignez la communauté Groupomania!</h1>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: "HomePage",
  components: { HomeHeader, FooterBar },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  color: #fd2d01;
  font-family: "Lato", sans-serif;
  background-size: 100%;
}
.home-pic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  text-shadow: 2px 2px 4px #edeaea;
}
img {
  margin-top: 45px;
  object-fit: cover;
}
</style>
