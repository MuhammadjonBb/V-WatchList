<template>
    <div class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <div class="filter__input-wrap">
            <h4 class="filter__title filter__descr-title">Рейтинг</h4>
            <input type="number" class="filter__input input" placeholder="От" v-model="filterData.rateFrom.value">
            <input type="number" class="filter__input input" placeholder="До" v-model="filterData.rateTo.value">
        </div>

        <div class="filter__input-wrap">
            <h4 class="filter__title filter__descr-title">Год</h4>
            <input type="number" class="filter__input input" placeholder="От" v-model="filterData.yearFrom.value">
            <input type="number" class="filter__input input" placeholder="До" v-model="filterData.yearTo.value">
        </div>

        <div class="filter__btn-group">
            <button class="button filter__btn filter__btn--submit btn-primary btn" @click="getFilteredFilms">Найти</button>
            <button class="button filter__btn filter__btn--clean  btn">Сбросить</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "@/apiInfo";
import { useFilmsStore } from "@/store";


const store = useFilmsStore();
const currentYear = new Date().getFullYear();
const API_KEY = "f361a58c-c004-4ebe-bc96-e37201232799";

const filterData = {
    rateFrom: ref(0),
    rateTo: ref(10),
    yearFrom: ref(1900),
    yearTo: ref(currentYear)
}

function getFilteredFilms() {
    // loader
    const $movieList = document.querySelector('.movie__list');
    $movieList.classList.add('loading');

    return axios
        .get(`${API_URL}/api/v2.2/films?order=RATING&type=ALL`, {
            params: {
                ratingFrom: filterData.rateFrom.value,
                ratingTo: filterData.rateTo.value,
                yearFrom: filterData.yearFrom.value,
                yearTo: filterData.yearTo.value,
                page: 1,
            }, headers: {
                "X-API-KEY": API_KEY,
                "Content-Type": "application/json",
            }
        })
        .then(data => {
            store.$patch({ filteredFilms: data });
        })
        .finally(() => $movieList.classList.remove('loading'));
}
</script>

<style lang="scss">
.filter {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e1e1e1;

    &__title {
        margin-bottom: 15px;
        color: #fff;
        line-height: 130%;
    }

    &__input-wrap {
        display: flex;
        flex-direction: column;
    }

    &__input-wrap:not(:last-child) {
        margin-bottom: 20px;
    }

    &__descr-title {
        font-size: 14px;
        margin: 0 0 5px 5px;
    }

    &__input {
        border: 1px solid rgba(217, 217, 217, 0.3);
        margin-left: 15px;
        color: #fff;
        padding: 10px 20px;
        max-width: 100%;
        border-radius: 3px;
    }

    &__input:not(:last-child) {
        margin-bottom: 10px;
    }

    &__input::placeholder {
        color: #777;
    }

    &__input:focus {
        outline: none;
    }

    &__btn-group {
        display: flex;
        justify-content: space-between;
    }

    &__btn {
        border: none;
        width: 45%;
        border-radius: 3px;
        padding: 10px 20px;
    }

    &__btn--clean {
        background: transparent;
        outline: 1px solid #f33f3f;
        color: #e1e1e1;
        transition: all .3s ease-in-out;
    }

    &__btn--clean:hover {
        outline-offset: 3px;
    }

    &__btn--clean:focus {
        background-color: #7e0a0a;
        color: #e1e1e1;
        outline-color: transparent;
    }
}
</style>