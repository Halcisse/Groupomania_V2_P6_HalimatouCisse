<template>
  <div class="home">
    <HomeHeader /> <br />

    <div class="home-pic">
      <h1>Rejoignez la communauté Groupomania!</h1>

      <img
        src="../assets/groupo-img.jpg"
        alt="illustration du logo groupomania"
      />
    </div>

    <FooterBar />
  </div>
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
  height: 70%;
  color: #fd2d01;
  font-family: "Lato", sans-serif;
}
.home-pic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* img {
  position: absolute;
  bottom: 29px;
  object-fit: cover;
  width: 100%;
} */
</style>
