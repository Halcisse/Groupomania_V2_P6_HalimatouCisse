<template>
  <header>
    <div class="header-titre">GROUPOMANIA</div>
    <div class="header-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Connexion</router-link>
      <router-link to="/signup">Inscription</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
  methods: {
    isLogged() {
      this.$router.push("/feed");
    },
  },
};
</script>

<style>
header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 3px 9px;
  border-bottom: solid 1px #dcdde7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-titre {
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: #84868e;
}
.header-nav {
  width: 40%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
a:hover {
  color: #fd2d01;
}
</style>
