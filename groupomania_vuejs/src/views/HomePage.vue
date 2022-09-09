<template>
  <div class="home">
    <HomeHeader />

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
}
</style>
