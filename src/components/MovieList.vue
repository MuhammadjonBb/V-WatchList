<template>
	<ul class="movie__list" v-if="isFilmsLoaded">
		<li class="movie__item" v-for="film in films.films" :key="film.filmId">
			<MovieCard :poster="film.posterUrl" :title="film.nameRu" :rating="film.rating" :time="film.filmLength"
				:year="film.year" :id="film.filmId" />
		</li>
	</ul>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { API_URL, API_KEY } from "@/apiInfo";
import { onMounted, ref } from "vue";

const films = ref();
const isFilmsLoaded = ref(false);

async function loadFilms() {
	const res = await fetch(
		`${API_URL}/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`,
		{
			method: "GET",
			headers: {
				"X-API-KEY": API_KEY,
				"Content-Type": "application/json",
			},
		}
	);

	return await res.json();
}

onMounted(() => {
	loadFilms().then((data) => {
		films.value = data;
		isFilmsLoaded.value = true;
	});
});
</script>

<style lang="scss">
.movie__list {
	padding-top: 30px;
	display: grid;
	grid-template-columns: 310px 310px 310px;
	row-gap: 30px;
	column-gap: 30px;
}
</style>
