import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import MoviePage from "@/pages/MoviePage.vue";
import WatchlistPage from "@/pages/WatchlistPage.vue";

const routes = [
	{
		path: "/V-WatchList/",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/V-WatchList/movie/:id",
		name: "Movie ",
		component: MoviePage,
	},
	{
		path: "V-WatchList/watchlist",
		name: "Watchlist",
		component: WatchlistPage,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
