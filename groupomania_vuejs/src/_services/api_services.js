// initialisation d'Axios

//PERMET DE CONGIF LES APPELS API AVEC AXIOS

//les modules
import Axios from "axios";
import { authServices } from "./auth_services";

const axios = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Credentials": "true",
  },
});

/**
 * Interceptor pour injection token
 */
axios.interceptors.request.use((request) => {
  // Si connecté on ajoute le token dans l'entête
  if (authServices.isLogged()) {
    request.headers.Authorization = "Bearer " + authServices.getToken();
  }

  return request;
});

export default axios;
