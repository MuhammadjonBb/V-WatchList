<template>
    <div class="movie container" v-if="movie" :style="`background-image:
    linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url('${movie.posterUrl}');`">
        <div class="movie__poster-wrap">
            <img :src="movie.posterUrl" :alt="movie.nameRu" class="movie__poster" />
        </div>

        <div class="movie__details">
            <h1 class="movie__title">{{ movie.nameRu }} ({{ movie.year }})</h1>
            <div class="movie__score">
                <ul class="movie__score-list">
                    <li class="movie__score-item">
                        <img src="../assets/imdb-icon.svg" alt="IMDb" class="movie__score-icon">
                        <span class="movie__score-value" v-if="movie.ratingImdb">{{ movie.ratingKinopoisk }}</span>
                        <span class="movie__score-value" v-else>--</span>
                    </li>
                    <li class="movie__score-item">
                        <img src="../assets/kinopoisk-icon.svg" alt="IMDb" class="movie__score-icon">
                        <span class="movie__score-value" v-if="movie.ratingKinopoisk">{{ movie.ratingKinopoisk }}</span>
                        <span class="movie__score-value" v-else>--</span>
                    </li>
                    <li class="movie__score-item"></li>
                </ul>
            </div>

            <div class="movie__info">
                <div class="movie__info-wrap">
                    <h3 class="movie__info-title">Жанр: </h3>
                    <ul class="movie__info-list">
                        <li class="movie__info-item" v-for="genre in movie.genres" :key="genre">
                            {{ genre.genre }}
                        </li>
                    </ul>
                </div>

                <div class="movie__info-wrap">
                    <h3 class="movie__info-title">Страна: </h3>
                    <ul class="movie__info-list">
                        <li class="movie__info-item" v-for="country in movie.countries" :key="country">
                            {{ country.country }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="movie__slogan" v-if="movie.slogan">
                <p> — <q>«{{ movie.slogan }}»</q></p>
            </div>

            <div class="movie__overview">
                <p class="movie__descr">{{ movie.description }}</p>
            </div>

            <div class="movie__footer">
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
    background-size: cover;
    background-repeat: no-repeat;

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

    &__info {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }

    &__info-wrap {
        display: flex;
    }

    &__info-wrap:not(:last-child) {
        margin-bottom: 5px;
    }

    &__info-title {
        font-weight: 400;
        font-size: 16px;
        text-transform: capitalize;
        line-height: 19px;
        color: #999;
        padding-right: 4px;
    }

    &__info-list {
        display: flex;
        flex-wrap: wrap;
    }


    &__info-item {
        font-weight: 400;
        font-size: 16px;
        text-transform: capitalize;
        line-height: 19px;
        color: #FFFFFF;
        padding-right: 4px;
    }

    &__age {
        margin-bottom: 20px;
        color: #D9D9D9;
        font-size: 20px;
    }

    &__overview {
        margin-bottom: 40px;
    }

    &__slogan {
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #999;
        font-style: italic;
    }

    &__descr {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #999;
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

    &__score {
        margin-bottom: 20px;
    }

    &__score-list {
        gap: 20px;
        display: flex;
        align-items: center;
    }

    &__score-value {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #999;
    }

    &__score-item {
        gap: 4px;
        display: flex;
        align-items: center;
    }
}
</style>
