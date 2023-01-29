<template>
	<div style="display: flex;">
		<AppAside></AppAside>
		<router-view />
	</div>
</template>

<script setup>
import AppAside from "@/components/AppAside.vue";
import HomePage from "@/pages/HomePage.vue";
</script>

<style scoped>

</style>
