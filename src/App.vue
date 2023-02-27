<template>
	<div style="display: flex;">
		<AppAside></AppAside>
		<router-view />
		<notifications position="bottom right" />
	</div>
</template>

<script setup>
import AppAside from "@/components/AppAside.vue";

if (!localStorage.getItem('watchlist')) {
	localStorage.setItem('watchlist', JSON.stringify([]));
}
</script>

<style scoped></style>
