<template>
  <header>
    <div class="header-titre">GROUPOMANIA</div>
    <div class="header-nav">
      <router-link to="/">Home</router-link>
      <button class="head_btn">Assistance</button>
      <button class="head_btn" @click="logout()">Déconnexion</button>
    </div>
  </header>
</template>

<script>
import { authServices } from "@/_services/auth_services";
export default {
  name: "FeedHeader",
  methods: {
    logout() {
      authServices.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 9px;
  border-bottom: solid 1px #dcdde7;
  width: 100%;
}
.header-titre {
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: #84868e;
}
.header-nav {
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  border: transparent;
  background-color: white;
  font-size: 15px;
}
a:hover,
button:hover {
  color: #fd2d01;
}
</style>
