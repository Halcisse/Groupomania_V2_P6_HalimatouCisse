<template>
  <HomeHeader />
  <div class="inscription_card">
    <div id="title">
      <h2>Inscription</h2>
      <p class="subtitle">
        Vous avez déjà un compte?
        <router-link to="/login">Connectez-vous!</router-link>
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
        <label for="lastName">Nom </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Ex: Durant "
          v-model="user.lastName"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Ex: Magalie"
          v-model="user.firstName"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="email">Adresse email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ex: nom.prenom@email.com"
          v-model="user.email"
          required
        />
      </div>
      <div class="champ_formulaire">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Minimum 6 caractères"
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
  margin: 5px;
  font-family: "Lato", sans-serif;
  font-size: 13px;
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
