<template>
	<ul class="movie__list" v-if="films">
		<li class="movie__item" v-for="film in films.films" :key="film.filmId">
			<MovieCard :poster="film.posterUrl" :title="film.nameRu" :year="film.year" :id="film.filmId"
				:genre="film.genres[0].genre" />
		</li>
	</ul>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { API_URL, config } from "@/apiInfo";
import { onMounted, ref, watch, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const films = ref();
const query = useQuery()

onMounted(() => {
	loadFilms().then((data) => {
		films.value = data;
	});
});

function loadFilms() {
	return axios
		.get(`${API_URL}/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`, config)
		.then(res => res.data);
}

function loadSearchedFilms() {
	if (!route.query.search) {
		loadFilms().then((data) => {
			films.value = data;
		});
	} else {
		return axios
			.get(`${API_URL}/api/v2.1/films/search-by-keyword?keyword=${query.value.search} `, config)
			.then(res => {
				films.value = res.data
			});
	}
}

function useQuery() {
	return computed(() => route.query)
}

watch(query, loadSearchedFilms), { deep: true, immediate: true };
</script>

<style lang="scss">
.movie__list {
	padding-top: 30px;
	display: grid;
	grid-template-columns: 198px 198px 198px 198px 198px;
	grid-auto-rows: 370px;
	row-gap: 30px;
	column-gap: 30px;
}
</style>
