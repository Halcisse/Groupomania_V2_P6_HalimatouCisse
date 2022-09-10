<template>
  <HomeHeader />
  <div id="inscription_card">
    <div id="title">
      <h2>Inscription</h2>
      <p>
        Vous avez déjà un compte?
        <router-link to="/login">Connectez vous!</router-link>
      </p>
      <p v-if="errors.length">
        <b>Merci de corriger les erreurs suivantes</b>
      </p>

      <!-- <ul>
        <li class="champError" v-for="error in errors">{{ error }}</li>
      </ul> -->
    </div>
    <form @submit.prevent="signup" id="formulaire">
      <div class="champ_formulaire">
        <label for="lastName">Veuillez entrer votre nom de famille</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Nom de famille"
          v-model="user.lastName"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="firstName">Veuillez entrer votre prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Prénom"
          v-model="user.firstName"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="email">Veuillez entrer votre adresse e-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          v-model="user.email"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="password">Veuillez entrer votre mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          v-model="user.password"
          required
        />
      </div>
      <button type="submit" id=" btn_inscription">Inscription</button>
    </form>
  </div>
  <FooterBar />
</template>

<!-- cisse hal test3@groupomania.com Groupomani@123 -->

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import FooterBar from "@/components/FooterBar.vue";
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
      if (!password.isValid) {
        this.errors.splice(
          0,
          1,
          "Le mot de passe doit avoir  au moins 6 caractères, une majuscule et une minuscule"
        );
      }
      //on verifie l'email
      let email = this.user.email;
      let regexpEmail = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
      console.log(regexpEmail.test(email));
      if (regexpEmail.test(email) == false || email == "") {
        this.errors.splice(
          0,
          1,
          "L'adresse email n'est pas conforme. Ex: test@exemple.com",
          this.$router.push("/login")
        );
      }
      //on verifie le nom
      let lastName = this.user.lastName;
      let regexplastName =
        /^(([A-Za-zÉÈÎÏéèêîïàç]+['.]?[ ]?|[a-zéèêîïàç]+['-]?)+)$/;
      console.log(regexplastName.test(lastName));
      if (regexplastName.test(lastName) == false || lastName == "") {
        this.errors.splice(0, 1, "Merci d'indiquer un Nom conforme");
      }
      //on verifie le prenom
      let firstName = this.user.firstName;
      let regexpfirstName =
        /^(([A-Za-zÉÈÎÏéèêîïàç]+['.]?[ ]?|[a-zéèêîïàç]+['-]?)+)$/;
      console.log(regexpfirstName.test(firstName));
      if (regexpfirstName.test(firstName) == false || firstName == "") {
        this.errors.splice(0, 1, "Merci d'indiquer un Prénom conforme");
      }
      //on définis le user a envoyer a la bdd
      let users = { lastName, firstName, email, password };
      console.log(users);
      if (
        regexplastName.test(lastName) == true &&
        regexpfirstName.test(firstName) == true &&
        regexpEmail.test(email) == true &&
        password != ""
      ) {
        sessionStorage.setItem("users", JSON.stringify(users));
        fetch("http://localhost:3000/api/auth/signup", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(users),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token && data.token != undefined && data.token != "") {
              //Si la creation du compte est ok alors les actions si dessous
              sessionStorage.setItem("token", data.token);
              this.$router.push("/forum");
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
  components: { HomeHeader, FooterBar },
};
</script>

<style>
#inscription_card {
  margin: 40px 98px;
}

#title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p,
h2,
label {
  margin-bottom: 5px;
  font-family: "Lato", sans-serif;
}
h2 {
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
  margin-bottom: 8px;
}

button {
  margin: 12px;
}

.champError {
  color: red;
  font-size: smaller;
  font-style: italic;
}
</style>
