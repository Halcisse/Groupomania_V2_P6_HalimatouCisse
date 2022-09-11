<template>
  <div class="feed">
    <FeedHeader />
    <div class="feed-contain">
      <div class="feed-aside">
        <FeedNav />
      </div>
      <div class="feed-main">
        <div class="item-create"><NewPost /></div>
        <div class="item-display"><DisplayPost /></div>
      </div>
    </div>
  </div>
  <!-- <FooterBar /> -->
</template>

<script>
import FeedHeader from "@/components/Feed/FeedHeader.vue";
// import FooterBar from "@/components/FooterBar.vue";
import FeedNav from "@/components/Feed/FeedNav.vue";
import DisplayPost from "@/components/Feed/DisplayPost.vue";
import NewPost from "@/components/Feed/NewPost.vue";
export default {
  name: "FeedPage",
  components: { FeedHeader, FeedNav, DisplayPost, NewPost },
};
</script>

<style>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px solid blue;
  color: blue;
}
.feed-contain {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 2px solid orange;
}
.feed-main {
  width: 100%;
  height: 100%;
}
.feed-aside {
  width: 40%;
  height: 100%;
}
.item-create {
  height: 20%;
}
/* .item-display {
  height: 100%;
} */
</style>
