<template>
  <HomeHeader />
  <div class="inscription_card">
    <div id="title">
      <h2>Inscription</h2>
      <p class="subtitle">
        Vous avez déjà un compte?
        <router-link to="/login">Connectez-vous!</router-link>
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
    <form @submit.prevent="signup" id="formulaire">
      <div class="champ_formulaire">
        <label for="lastName">Nom </label>
        <input
          type="text"
          placeholder="Ex: Durant "
          v-model="user.lastName"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="firstName">Prénom</label>
        <input
          type="text"
          placeholder="Ex: Magalie"
          v-model="user.firstName"
          required
        />
      </div>
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
      <button type="submit" id=" btn_inscription">Je valide</button>
    </form>
  </div>
  <FooterBar />
</template>

<!-- cisse hal test3@groupomania.com Groupomani@123 -->

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import FooterBar from "@/components/FooterBar.vue";
import { authServices } from "@/_services/auth_services";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        isAdmin: false,
      },
      errors: [],
    };
  },
  methods: {
    //on verifie le password
    signup() {
      console.log(this.errors);
      let password = this.user.password;
      let regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
      if (regexPassword.test(password) == false || password == "") {
        this.errors.splice(
          0,
          1,
          "Le mot de passe doit avoir au moins 6 caractères, une majuscule, une minuscule et un chiffre"
        );
      }
      //on verifie l'email
      let email = this.user.email;
      let regexEmail =
        /^([a-zA-Z0-9]+).([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
      console.log(regexEmail.test(email));
      if (regexEmail.test(email) == false || email == "") {
        this.errors.splice(
          0,
          1,
          "L'adresse email n'est pas conforme. Ex: test@exemple.com"
        );
      }
      //on verifie le nom
      let lastName = this.user.lastName;
      let regexLastName =
        /^(([A-Za-zÉÈÎÏéèêîïàç]+['.]?[ ]?|[a-zéèêîïàç]+['-]?)+)$/;
      if (regexLastName.test(lastName) == false || lastName == "") {
        this.errors.splice(0, 1, "Le nom n'est pas conforme");
      }
      //on verifie le prenom
      let firstName = this.user.firstName;
      let regexFirstName =
        /^(([A-Za-zÉÈÎÏéèêîïàç]+['.]?[ ]?|[a-zéèêîïàç]+['-]?)+)$/;
      if (regexFirstName.test(firstName) == false || firstName == "") {
        this.errors.splice(0, 1, "Le prénom n'est pas conforme");
      }
      //on définis le user a envoyer a la bdd
      let user = { lastName, firstName, email, password };
      console.log(user);
      if (
        regexLastName.test(lastName) == true &&
        regexFirstName.test(firstName) == true &&
        regexEmail.test(email) == true &&
        regexPassword.test(password) == true
      ) {
        alert(
          "Félicitations,le compte a été crée avec succès! Vous pouvez vous connecter"
        );
        authServices
          .signup(user)
          .then((res) => {
            let token = res.data.token;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/login");
          })
          .catch((err) => console.log(err));
      }
    },
  },
  components: { HomeHeader, FooterBar },
};
</script>

<style scoped>
.inscription_card {
  max-height: 100%;
  width: 50%;
  margin: 30px 0;
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
