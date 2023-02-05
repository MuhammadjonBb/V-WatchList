<template>
	<aside class="aside">
		<img src="../assets/ logo.svg" alt="Logo" class="aside__logo" />

		<ul class="aside__list">
			<li class="aside__item">
				<router-link class="aside__btn aside__list-btn" to="/">
					<img src="../assets/home-icon.svg" alt="Дом" />
					Home
				</router-link>
				<router-link class="aside__btn aside__list-btn btn" to="/watchlist">
					<img src="../assets/list.svg" alt="Список" />
					Watchlist
				</router-link>
			</li>
		</ul>
	</aside>
</template>

<style lang="scss">
.aside {
	display: flex;
	padding: 30px;
	flex-direction: column;
	min-width: 20%;
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
</style>
