import axios from "./api_services";

let login = (Credentials) => {
  return axios.post("/auth/login", Credentials);
};
let signup = (Credentials) => {
  return axios.post("/auth/signup", Credentials);
};

let logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("users");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("post");
  window.location.reload();
};

let getToken = () => {
  return sessionStorage.getItem("token");
};


let isLogged = () => {};

export const authServices = {
  login,
  signup,
  logout,
  getToken,

  isLogged,
};
