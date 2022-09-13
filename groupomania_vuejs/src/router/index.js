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
      // children: [
      //   // redirection vers forum en cas de mauvais routage
      //   {
      //     path: "/:PathMatch(.*)*",
      //     component: () => import("./views/ForumLayout.vue"),
      //   },
      // ],
    },

    // {
    //   path: "/edit/:id",
    //   name: "edit",
    //   component: () => import("../components/forum/EditPost.vue"),
    //   props: true,
    // },
    // {
    //   path: "/delete/:id",
    //   name: "delete",
    //   component: () => import("../components/forum/DeletePost.vue"),
    //   props: true,
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
