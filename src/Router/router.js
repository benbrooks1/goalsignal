import Vue from "vue";
import Router from "vue-router";
import $store from "../Vuex/store";
// const ScannerAll = () => import("./../Pages/Scanner/All.vue");
const ScannerLive = () => import("./../Pages/Scanner/Live.vue");
const ScannerShortlist = () => import("./../Pages/Scanner/Shortlist.vue");
const ScannerUpcoming = () => import("./../Pages/Scanner/Upcoming.vue");
const ScannerFinished = () => import("./../Pages/Scanner/Finished.vue");

const NotificationList = () =>
  import("./../Pages/Scanner/NotificationList.vue");
const Signals = () => import("./../Pages/Signals.vue");
const Login = () => import("./../Pages/Authentication/Login.vue");
const mainLayout = () => import("./../Layouts/Main_Layout.vue");
const authLayout = () => import("./../Layouts/Auth_Layout.vue");
const Signup = () => import("./../Pages/Authentication/Signup.vue");
const ForgotPassword = () =>
  import("../Pages/Authentication/ForgotPassword.vue");
const ResetPassword = () => import("../Pages/Authentication/ResetPassword.vue");
const AllowUserAccess = () =>
  import("../Pages/Authentication/AllowUserAccess.vue");
import constants from "../Constants";

Vue.use(Router);
const router = new Router({
  base:  '/goal/',
  // base:  '/',
  mode: "history",
  routes: [
    {
      path: "/account",
      component: authLayout,
      children: [
        { path: "/login", component: Login },
        { path: "/signup", component: Signup },
        { path: "/forgot-password", component: ForgotPassword },
        { path: "/reset-password", component: ResetPassword },
        {
          path: "/membership_login",
          component: AllowUserAccess,
          props: { default: true }
        }
      ],
      beforeEnter: (to, from, next) => {
        let isLoggedIn =
          $store.state.$Auth.loggedIn &&
          localStorage.getItem(constants.LOCALSTORAGE.AUTH_KEY)
            ? true
            : false;
        switch (isLoggedIn) {
          case false:
            next();
            break;
          case true:
            next("/scanner/live");
            break;
        }
      }
    },
    // Below routes require authentication

    {
      path: "/scanner",
      component: mainLayout,
      children: [
        // { path: "/scanner/all", component: ScannerAll },
        { path: "/scanner/live", component: ScannerLive },
        { path: "/scanner/shortlist", component: ScannerShortlist },
        { path: "/scanner/upcoming", component: ScannerUpcoming },
        { path: "/scanner/finished", component: ScannerFinished },
        { path: "/scanner/notification", component: NotificationList },
        { path: "/scanner/", component: ScannerLive }
      ],
      beforeEnter: (to, from, next) => {
        let shouldProceedLogin =
          $store.state.$Auth.loggedIn &&
          localStorage.getItem(constants.LOCALSTORAGE.AUTH_KEY)
            ? true
            : false;
            console.log(shouldProceedLogin,"shouldPRcesslogin");
        switch (shouldProceedLogin) {
          case false:
            next("/signup");
            break;
          case true:
            next();
            break;
        }
      }
    },
    {
      path: "/",
      redirect: '/scanner/live'
    },
    {
      path: '*',
      redirect: '/scanner/live'
    }
  ]
});
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    // NProgress.start();
  }
  next();
});
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  // NProgress.done();
});
export default router;
