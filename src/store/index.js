import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilmsStore = defineStore('films', () => {
    const filteredFilms = ref(null);

    function clearFilteredFilms() {
        filteredFilms.value = null;
    }

    return { filteredFilms, clearFilteredFilms }
});