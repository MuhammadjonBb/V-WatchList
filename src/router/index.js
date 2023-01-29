import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue"
import MoviePage from "@/pages/MoviePage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/movie/:id",
    name: "Movie ",
    component: MoviePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;