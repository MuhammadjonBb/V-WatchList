<template>
	<form class="search search__form" @submit.prevent="onSubmit()">
		<input type="text" v-model="value" placeholder="Найти фильм по названию" class="search__input input" />
		<button class="btn-primary search__btn btn" :disabled="!value.trim()">Найти</button>
	</form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const value = ref('');

function onSubmit() {
	router.push({ query: { search: value.value } });
	value.value = '';
}

</script>

<style lang="scss">
.search {
	display: flex;

	&__input {
		padding: 13px 50px;
		border: 1px solid rgba(217, 217, 217, 0.3);
		border-radius: 6px;
		color: #fff;
	}

	&__input:focus {
		outline: none;
	}

	&__btn {
		padding: 13px 22px;
		border-radius: 6px;
		transition: opacity .3s ease-in-out;
	}

	&__btn:disabled {
		opacity: 0.5;
	}
}
</style>
