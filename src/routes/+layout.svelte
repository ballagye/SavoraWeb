<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://api.fontshare.com/v2/css?f[]=britney@700,400&display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}

<style>
</style>
