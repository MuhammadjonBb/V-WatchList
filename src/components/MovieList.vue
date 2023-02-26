<template>
	<ul class="movie__list" v-if="films" ref="scrollComponent">
		<li class="movie__item" v-for="film in (films.films || films.items)" :key="film.filmId">
			<MovieCard :poster="film.posterUrl" :title="film.nameRu" :year="film.year" :id="film.filmId || film.kinopoiskId"
				:genre="film.genres[0]?.genre" />
		</li>
	</ul>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { API_URL, config } from "@/apiInfo";
import { onMounted, ref, watch, computed, onUnmounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useFilmsStore } from "@/store";

const store = useFilmsStore();
const route = useRoute();
const query = useQuery();
const films = ref(null);
const pageNum = ref(1);
const scrollComponent = ref(null);
const isFilterData = ref(false);
const isSearchData = ref(false);

onMounted(() => {
	loadTopFilms(pageNum.value).then(data => films.value = data);
	window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});

function loadTopFilms(num) {
	setTopFilms();
	return axios
		.get(`${API_URL}/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${num}`, config)
		.then(res => res.data);
}

function loadMoreTopFilms() {
	if (films.value.pagesCount === pageNum.value) return;
	pageNum.value += 1;
	loadTopFilms(pageNum.value).then(data => {
		films.value.films.push(...data.films);
	});
}

function loadMoreSearhedFilms() {
	if (films.value.pagesCount === pageNum.value) return;
	pageNum.value += 1;

	loadSearchedFilms().then(res => {
		films.value.films.push(...res.data.films);
	})
}

function loadMoreFilteredFilms() {
	if (films.value.pagesCount === pageNum.value) return;
	const API_KEY = "f361a58c-c004-4ebe-bc96-e37201232799";
	const url = store.filteredFilms.config.url;
	const urlParams = store.filteredFilms.config.params;

	setFilteredFilms();
	pageNum.value += 1;

	return axios
		.get(url, {
			params: {
				ratingFrom: urlParams.ratingFrom,
				ratingTo: urlParams.ratingTo,
				yearFrom: urlParams.yearFrom,
				yearTo: urlParams.yearTo,
				page: pageNum.value,
			}, headers: {
				"X-API-KEY": API_KEY,
				"Content-Type": "application/json",
			}
		})
		.then(res => {
			store.filteredFilms.data.items.push(...res.data.items);
		});
}

function handleScroll() {
	const elm = scrollComponent.value;
	if (elm?.getBoundingClientRect().bottom < window.innerHeight) {
		if (isSearchData.value) {
			loadMoreSearhedFilms();
		} else if (isFilterData.value) {
			loadMoreFilteredFilms();
		} else
			loadMoreTopFilms();
	}
}

function loadSearchedFilms() {
	if (!route.query.search) {
		loadTopFilms(pageNum.value).then(data => films.value = data);
	} else {
		if (!isSearchData.value) pageNum.value = 1;
		return axios
			.get(`${API_URL}/api/v2.1/films/search-by-keyword?keyword=${query.value.search}&page=${pageNum.value}`, config)
			.then(res => {
				setSearchedFilms();
				return res;
			});
	}
}

function handleStoreFilms() {
	if (store.filteredFilms) {
		films.value = store.filteredFilms.data;
		if (!isFilterData.value) pageNum.value = 1;
		setFilteredFilms();
	} else
		loadTopFilms(pageNum.value).then(data => films.value = data);
}

function setTopFilms() {
	isFilterData.value = false;
	isSearchData.value = false;
}

function setFilteredFilms() {
	isSearchData.value = false;
	isFilterData.value = true;
}

function setSearchedFilms() {
	isFilterData.value = false;
	isSearchData.value = true;
}

function useQuery() {
	return computed(() => route.query);
}

watch(store, handleStoreFilms);
watch(query, () => loadSearchedFilms().then(res => films.value = res.data));
</script>

<style lang="scss">
.movie__list {
	padding-top: 30px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-auto-rows: 370px;
	row-gap: 30px;
	column-gap: 30px;
	min-width: 1130px;
}
</style>
