<template>
  <HomeHeader />
  <div class="connexion_card">
    <div id="title">
      <h2>Connexion</h2>
      <p class="subtitle">
        Vous n'avez pas de compte?
        <router-link to="/signup">Inscrivez-vous!</router-link>
      </p>
      <div class="error">
        <p v-if="errors.length">
          <b>Merci de corriger les erreurs suivantes</b>
        </p>

        <ul>
          <li class="champError" v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
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
import { authServices } from "@/_services/auth_services";

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
      authServices
        .login(user)
        .then((res) => {
          if (authServices.isLogged == true) {
            this.$router.push("/feed");
          }
          alert("Login ok");
          sessionStorage.setItem("id", res.data.id);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/feed");
        })
        .catch((err) => {
          if (err) {
            this.errors.splice(
              0,
              1,
              "Accès refusé, merci de vérifier vos identifiants"
            );
          }
        });
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

.error {
  color: #fd2d01;
  font-size: 9px;
  font-style: italic;
}
</style>
