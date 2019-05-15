import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Unknown from "./components/404.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      name: "404",
      component: Unknown
    }
  ]
});
