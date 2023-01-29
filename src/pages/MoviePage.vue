<template>
    <div class="movie" v-if="movie">
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

            <div class="movie__overview">
                <h2 class="movie__title movie__title--about">Описание</h2>

                <p class="movie__descr">{{ movie.description }}</p>
            </div>

            <div class="movie__score">
                <span class="movie__score-count">{{ movie.ratingKinopoisk }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { API_URL, API_KEY } from "@/apiInfo";
import { onMounted, ref } from 'vue';

const route = useRoute();
const movie = ref();

async function getFilmDetails() {
    const res = await fetch(
        `${API_URL}/api/v2.2/films/${route.params.id}`,
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
    getFilmDetails().then(data => movie.value = data);
    console.log(movie.value);
})
</script>

<style lang="scss">
.movie {
    display: flex;
    padding: 60px;
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

    &__genre-country {
        display: flex;
        margin-bottom: 50px;
    }

    &__genre-country-list {
        display: flex;
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

}
</style>
