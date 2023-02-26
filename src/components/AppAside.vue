<template>
	<aside class="aside">
		<div class="logo-wrap">
			<img src="../assets/logo.svg" alt="Logo" class="aside__logo" />
		</div>
		<ul class="aside__list">
			<li class="aside__item">
				<router-link class="aside__btn aside__list-btn" to="/">
					<img src="../assets/home-icon.svg" alt="Дом" />
					Каталог
				</router-link>
				<router-link class="aside__btn aside__list-btn btn" to="/watchlist">
					<img src="../assets/list.svg" alt="Список" />
					Watchlist
				</router-link>
			</li>
		</ul>

		<Transition name="slide-fade">
			<aside-filter v-show="route.fullPath === '/'"></aside-filter>
		</Transition>
	</aside>
</template>

<script setup>
import AsideFilter from '@/components/AsideFilter.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="scss">
.aside {
	display: flex;
	padding: 30px;
	flex-direction: column;
	min-width: 19%;
	background-color: #000;
	min-height: 100vh;

	&__logo {
		margin-bottom: 20px;
		width: 212px;
		height: 44px;
	}

	&__list {
		margin-bottom: 30px;
	}

	&__list-btn {
		display: flex;
		padding: 10px;
		max-width: 100%;
		gap: 15px;
		color: #e1e1e1;
		text-decoration: none;
		border-radius: 3px;
		transition: background-color 0.3s ease;
		align-items: center;
	}

	&__list-btn:hover {
		background-color: #4a4a4a;
	}

	&__list-btn:not(:last-child) {
		margin-bottom: 20px;
	}
}

.logo-wrap {
	display: flex;
	font-size: 48px;
	color: #35495e;
}
</style>
