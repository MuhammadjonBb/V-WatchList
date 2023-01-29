<template>
	<form class="search search__form">
		<input type="text" placeholder="Найти фильм по названию" class="search__input input" />
		<button class="btn-primary search__btn btn">Найти</button>
	</form>
</template>

<script setup></script>

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
	}
}
</style>
