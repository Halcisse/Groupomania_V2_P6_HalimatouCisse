import router from "../router";

export function authGuard() {
  let token = sessionStorage.getItem("token");
  //Si le token est bien présent = user connecté on retourne true
  if (token && token != "" && token != null && token != undefined) {
    return true;
  }
  // sinon, on redirige vers login
  router.push("/login");
}
