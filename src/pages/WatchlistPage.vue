<template>
    <div class="container">
        <div class="w-list__wrap" v-if="movies.length">
            <ul class="w-list__list list">
                <li class="list__item item" v-for="movie in movies" :key="movie.id">
                    <img :src="movie.poster" :alt="movie.title" class="item__poster" @click="onItemClick(movie.id)">
                    <h2 class="item__title" @click="onItemClick(movie.id)">{{ movie.title }} <span
                            class="item__year">({{ movie.year }})</span>
                    </h2>
                    <button class="item__remove-btn btn btn-secondary" @click="onRemoveBtn(movie.id)">Удалить</button>
                </li>
            </ul>
        </div>
        <div class="empty" v-else>
            <h1 class="empty__title">
                Здесь пока пусто...
            </h1>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const movies = ref(JSON.parse(localStorage.getItem('watchlist')));
const router = useRouter();

function onItemClick(id) {
    router.push({ path: `/movie/${id}` });
}

function onRemoveBtn(id) {
    movies.value = movies.value.filter(m => m.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(movies.value));
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
}

.list {
    display: grid;
    grid-auto-rows: 75px;
    row-gap: 10px;
}

.item__title:hover,
.item__poster:hover {
    cursor: pointer;
}

.item {
    padding-right: 15px;
    display: flex;
    border: 1px solid #E1E1E1;
    color: #E1E1E1;
    border-radius: 4px;
    overflow: hidden;
    align-items: center;

    &__poster {
        width: 50px;
        margin-right: 15px;
    }

    &__title {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #E1E1E1;
    }

    &__year {
        color: #555;
    }

    &__remove-btn {
        margin-left: auto;
    }

}

.empty {
    &__title {
        color: #fff;
        font-size: 24px;
        line-height: 150%;
    }
}
</style>