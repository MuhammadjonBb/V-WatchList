<template>
	<div class="movie__card card" @click="onCardClick()">
		<div class="card__header" :style="`background-image: url(${poster})`"></div>

		<div class="card__content">
			<div class="card__content-head">
				<h3 class="card__title">{{ title }}</h3>
				<div class="card__ratings">
					<span>{{ rating }}</span>/10
				</div>
			</div>
			<div class="card__info">
				<div class="card__info-descr">
					<label>Год</label>
					<span>Длительность</span>
				</div>
				<div class="card__info-descr">
					<label>{{ year }}</label>
					<span>{{ time }}</span>
				</div>
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
	rating: String,
	time: String,
	year: String,
	id: Number,
});

const { id } = toRefs(props);

function onCardClick() {
	router.push({ path: `/V-WatchList/movie/${id.value}` });
}
</script>

<style lang="scss">
.card {
	background: #ffffff;
	box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
	width: 100%;
	border-radius: 10px;
	display: inline-block;
	transition: transform 0.3s ease;
	cursor: pointer;

	&__header {
		padding: 0;
		margin: 0;
		height: 450px;
		width: 100%;
		display: block;
		background-size: cover;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	&__content {
		padding: 18px 18px 24px 18px;
	}

	&__content-head,
	&__info {
		display: table;
		width: 100%;
	}

	&__title {
		font-family: "Roboto";
		font-size: 22px;
		margin: 0;
		display: table-cell;
		display: -webkit-box;
		-webkit-line-clamp: 1; // количество строк
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	&__ratings {
		width: 50px;
		height: 15px;
		background-size: contain;
		display: table-cell;
		text-align: right;
		position: relative;
		margin-top: 5px;
		font-weight: 600;
	}

	&__ratings span {
		color: #2196f3;
	}

	&__info {
		margin-top: 1em;
	}

	&__info-descr {
		display: table-cell;
		text-transform: uppercase;
		text-align: center;
	}

	&__info-descr:first-of-type {
		text-align: left;
	}

	&__info-descr:last-of-type {
		text-align: right;
	}

	&__info-descr label {
		display: block;
		color: rgba(0, 0, 0, 0.5);
		margin-bottom: 0.5em;
		font-size: 9px;
	}

	&__info-descr span {
		font-weight: 700;
		font-size: 11px;
	}
}

.card:hover {
	-webkit-transform: scale(1.03);
	transform: scale(1.03);
	box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
}
</style>
