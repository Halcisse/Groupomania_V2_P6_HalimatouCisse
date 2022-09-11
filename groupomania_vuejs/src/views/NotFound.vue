<template>
  <div class="notfound">
    <iconTag icon="fa-thin fa-circle-xmark" />
    <font-awesome-icon icon="fa-thin fa-circle-xmark" />
    <h1>Une erreur s'est produite !</h1>
    <p>Veuillez revenir sur la page précédente</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: "Lato", sans-serif;
  color: #fd2d01;
}
</style>
