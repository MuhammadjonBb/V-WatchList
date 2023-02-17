<template>
	<div class="movie__card card" @click="onCardClick()">
		<img class="card__poster" :src="poster" />

		<div class="card__content">
			<h3 class="card__title">{{ title }}</h3>

			<div class="card__info">
				<span class="card__year">{{ year }}</span> / <span class="card__genre">{{ genre }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';
const router = useRouter();

const props = defineProps({
	poster: String,
	title: String,
	year: String,
	id: Number,
	genre: String,
});

const { id } = toRefs(props);

function onCardClick() {
	router.push({ path: `/movie/${id.value}` });
}
</script>

<style lang="scss">
.card {
	width: 100%;
	border-radius: 10px;
	display: inline-block;
	transition: transform 0.3s ease;
	cursor: pointer;

	&__poster {
		position: relative;
		padding: 0;
		margin: 0;
		height: 300px;
		width: 100%;
		display: block;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	&__poster::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.7);
		opacity: 0;
		z-index: 5;
		transition: opacity .3s ease-in-out;
	}

	&__content {
		padding-top: 5px;
	}

	&__title {
		margin-bottom: 3px;
		color: #fff;
		font-size: 16px;
		line-height: 130%;
		-webkit-line-clamp: 2; // количество строк
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	&__info {
		text-transform: capitalize;
		color: #777;
		font-size: 12px;
	}
}

.card:hover {
	-webkit-transform: scale(1.03);
	transform: scale(1.03);
	box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
}

.card:hover .card__poster::after {
	opacity: 1;
}
</style>
