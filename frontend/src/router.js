import Vue from "vue";
import Router from "vue-router";
import PokeDex from "./views/PokeDex.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "pokeDex",
      component: PokeDex
    },
    {
      path: "/:name",
      name: "pokemonDetail",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/PokemonDetail.vue")
    }
  ]
});
