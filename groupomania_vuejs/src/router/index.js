import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "../_helpers/auth-guard";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    // Routage Public
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("@/views/SignupPage.vue"),
    },

    // Routage authentifié
    {
      path: "/feed",
      name: "FeedPage",
      beforeEnter: authGuard,
      component: () => import("../views/FeedPage.vue"),
    },
    // {
    //   path: "/profil",
    //   name: "ProfilPage",
    //   beforeEnter: authGuard,
    //   component: () => import("../views/ProfilPage.vue"),
    // },

    // redirection vers 404 en cas de mauvais routage
    {
      path: "/:PathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

//plus accès a ses fct lorsqu'il n'y a plus de token (expiration)
router.beforeEach((to, from, next) => {
  if (to.matched[0].name == "feedPage") {
    authGuard();
  }
  next();
});
export default router;
