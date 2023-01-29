<template>
	<aside class="aside">
		<img src="../assets/ logo.svg" alt="Logo" class="aside__logo" />

		<ul class="aside__list">
			<li class="aside__item">
				<button class="aside__btn aside__list-btn btn">
					<img src="../assets/home-icon.svg" alt="" srcset="" />
					Home
				</button>
				<button class="aside__btn aside__list-btn btn">
					<img src="../assets/home-icon.svg" alt="" srcset="" />
					Watchlist
				</button>
			</li>
		</ul>
	</aside>
</template>

<style lang="scss">
.aside {
	display: flex;
	padding: 30px;
	flex-direction: column;
	width: 320px;
	background-color: #000;
	min-height: 100%;

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
		width: 100%;
		gap: 15px;
		color: #e1e1e1;
		border-radius: 3px;
		transition: all 0.3s ease;
		background-color: #4a4a4a;
		justify-content: center;
		align-items: center;
	}

	&__list-btn:not(:last-child) {
		margin-bottom: 20px;
	}
}
</style>
