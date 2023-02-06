import { createWebHashHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import MoviePage from "@/pages/MoviePage.vue";
import WatchlistPage from "@/pages/WatchlistPage.vue";

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
	{
		path: "/watchlist",
		name: "Watchlist",
		component: WatchlistPage,
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
