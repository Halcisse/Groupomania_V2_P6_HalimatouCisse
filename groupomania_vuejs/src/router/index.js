import { createRouter, createWebHistory } from "vue-router";
// import { authGuard } from "../_helpers/auth-guard";

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
      path: "/feed",
      name: "FeedPage",
      component: () => import("@/views/Feed.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("@/views/Signup.vue"),
    },

    // Routage authentifié
    // {
    //   path: "/forum",
    //   name: "ForumLayout",
    //   beforeEnter: authGuard,
    //   component: () => import("./views/ForumLayout.vue"),
    //   children: [
    //     // redirection vers forum en cas de mauvais routage
    //     {
    //       path: "/:PathMatch(.*)*",
    //       component: () => import("./views/ForumLayout.vue"),
    //     },
    //   ],
    // },

    // {
    //   path: "/login",
    //   name: "Login",
    //   component: () => import("../components/Login.vue"),
    // },
    // {
    //   path: "/signup",
    //   name: "SignUp",
    //   component: () => import("../components/Signup.vue"),
    // },
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
    // {
    //   path: "/:PathMatch(.*)*",
    //   name: "notfound",
    //   component: () => import("../views/public/NotFound.vue"),
    // },
  ],
});

//pour que l'admin n'est plus accès a ses fct lorsqu'il n'y a plus de token (expiration)
// router.beforeEach((to, from, next) => {
//   if (to.matched[0].name == "admin" || to.matched[0].name == "forum") {
//     authGuard();
//   }
//   next();
// });
export default router;
