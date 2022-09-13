<template>
  <HomeHeader />
  <div class="connexion_card">
    <div id="title">
      <h2>Connexion</h2>
      <p class="subtitle">
        Vous n'avez pas de compte?
        <router-link to="/signup">Inscrivez-vous!</router-link>
      </p>
      <p v-if="errors.length">
        <b>Merci de corriger les erreurs suivantes</b>
      </p>

      <ul>
        <li class="champError" v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="login" id="formulaire">
      <div class="champ_formulaire">
        <label for="email">Adresse email</label>
        <input
          type="email"
          placeholder="Ex: nom.prenom@email.com"
          v-model="user.email"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          placeholder="min 6 caractères, 1 majuscule, 1 minuscule, 1 chiffre"
          v-model="user.password"
          required
        />
      </div>
      <button type="submit" id=" btn_connexion">Je valide</button>
    </form>
  </div>
  <FooterBar />
</template>

<!-- cisse hal test3@groupomania.com Groupomani@123 -->

<script>
import HomeHeader from "../components/Home/HomeHeader.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: "LogIn",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    login() {
      let user = this.user;

      fetch("http://localhost:3000/api/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data), console.log(data.token);
          if (data.token) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.id);
            this.$router.push("/forum");
          }
        })
        .catch((err) => console.log(err));
    },
  },
  components: { HomeHeader, FooterBar },
};
</script>

<style scoped>
.connexion_card {
  max-height: 100%;
  width: 40%;
  margin: 65px 0 30px 0;
}
#title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 11px;
}
p,
label {
  margin: 2px;
  font-family: "Lato", sans-serif;
  font-size: 11px;
}
h2 {
  margin: 5px;
  font-family: "Lato", sans-serif;
  color: #fd2d01;
}
form {
  border: 2px solid #fd2d01;
  border-radius: 21px;
  padding: 10px 15px;
}
.champ_formulaire {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

input {
  font-family: "Lato", sans-serif;
  border: 1px solid #bebfcb;
  border-radius: 9px;
  padding: 3px;
  font-size: 11px;
}

button {
  margin: 12px;
  border: 1px solid #fd2d01;
  border-radius: 6px;
  background-color: #fff;
  color: #fd2d01;
}

.champError {
  color: #fd2d01;
  font-size: smaller;
  font-style: italic;
}
</style>
