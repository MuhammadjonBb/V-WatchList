<template>
    <div class="movie container" v-if="movie">
        <div class="movie__poster-wrap">
            <img :src="movie.posterUrl" alt="" class="movie__poster" />
        </div>
        <div class="movie__details">
            <h1 class="movie__title">{{ movie.nameRu }} ({{ movie.year }})</h1>

            <div class="movie__genre-country">
                <div class="movie__genre-country-info">
                    <ul class="movie__genre-country-list">
                        <li class="movie__genre-country-item movie__genre" v-for="genre in movie.genres" :key="genre">
                            {{ genre.genre }}
                        </li>
                    </ul>
                </div>
                <div class="movie__genre-country-info">
                    <ul class="movie__genre-country-list">
                        <li class="movie__genre-country-item movie__country" v-for="country in movie.countries"
                            :key="country">
                            {{ country.country }}
                        </li>
                    </ul>
                </div>
            </div>

            <span class="movie__age" v-if="movie.ratingAgeLimits">+{{ (movie.ratingAgeLimits).slice(3) }}</span>

            <div class="movie__overview">
                <h2 class="movie__title movie__title--about">Описание</h2>

                <p class="movie__descr">{{ movie.description }}</p>
            </div>

            <div class="movie__footer">
                <div class="movie__score">
                    <h3 class="movie__title movie__title--rate">Рейт</h3>
                    <span class="movie__score-count" v-if="movie.ratingKinopoisk">{{ movie.ratingKinopoisk }}</span>
                    <span class="movie__score-count" v-else-if="movie.ratingImdb">{{ movie.ratingImdb }}</span>
                    <span class="movie__score-count" v-else>{{ movie.ratingFilmCritics }}</span>
                </div>

                <button @click="addToWatchlist" class="btn-primary btn movie__add-list-btn">Добавить в
                    Watchlist*</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { API_URL, config } from "@/apiInfo";
import { onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const movie = ref();

function getFilmDetails() {
    return axios
        .get(`${API_URL}/api/v2.2/films/${route.params.id}`, config)
        .then(res => res.data);
}

function addToWatchlist() {
    const _movie = {
        title: movie.value.nameRu,
        year: movie.value.year,
        poster: movie.value.posterUrl,
        id: movie.value.kinopoiskId
    }
    const list = JSON.parse(localStorage.getItem('watchlist'));

    if (list.find(m => m.id === _movie.id)) return;

    list.push(_movie);
    localStorage.setItem('watchlist', JSON.stringify(list));
}

onMounted(() => {
    getFilmDetails().then(data => movie.value = data);
})
</script>

<style lang="scss">
.movie {
    display: flex;
    gap: 45px;

    &__poster {
        border-radius: 6px;
        width: 300px;
        height: 444px;
    }

    &__details {
        display: flex;
        flex-direction: column;
    }

    &__title {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 36px;
        line-height: 43px;
        color: #E1E1E1;
    }

    &__title--rate {
        font-size: 25px;
        margin: 0;
        text-align: center;
        line-height: 150%;
    }

    &__genre-country {
        display: flex;
        margin-bottom: 15px;
    }

    &__genre-country-list {
        display: flex;
        flex-wrap: wrap;
    }

    &__genre-country-info {
        position: relative;
    }

    &__genre-country-info:not(:last-child) {
        margin-right: 15px;
        padding-right: 11px;
    }

    &__genre-country-info:not(:last-child)::before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: #D9D9D9;
    }

    &__genre-country-item {
        font-weight: 400;
        font-size: 16px;
        text-transform: capitalize;
        line-height: 19px;
        color: #FFFFFF;
        padding-right: 4px;
    }

    &__genre:not(:last-child)::after,
    &__country:not(:last-child)::after {
        content: ', ';
    }

    &__age {
        margin-bottom: 20px;
        color: #D9D9D9;
        font-size: 20px;
    }

    &__title--about {
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
    }

    &__overview {
        margin-bottom: 40px;
    }

    &__descr {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #E1E1E1;
    }

    &__score {
        width: 81px;
        padding: 15px;
        background: rgba(217, 217, 217, 0.1);
        border: 1px solid #A41B1B;
        border-radius: 8px;
    }

    &__score-count {
        justify-content: center;
        font-weight: 700;
        font-size: 36px;
        line-height: 43px;
        display: flex;
        align-items: center;
        color: #F33F3F;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    &__add-list-btn {
        padding: 22px 31px;
        border-radius: 4px;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
    }
}
</style>
