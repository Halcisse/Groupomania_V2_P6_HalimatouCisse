import axios from "./api_services";

let login = (Credentials) => {
  return axios.post("/auth/login", Credentials);
};
let signup = (Credentials) => {
  return axios.post("/auth/signup", Credentials);
};

let logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("post");
  window.location.reload();
};

let isLogged = () => {
  let token = sessionStorage.getItem("token");
  if (!token) {
    return false;
  }
};

export const authServices = {
  login,
  signup,
  logout,
  isLogged,
};
