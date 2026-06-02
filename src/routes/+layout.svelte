<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://api.fontshare.com/v2/css?f[]=britney@700,400&f[]=aeonik@300,400,500,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	:global(html, body) {
		background-color: #1e1005;
		font-family: 'Aeonik', sans-serif;
		font-weight: 400;
		color: #1e1005;
		margin: 0;
		padding: 0;
		scroll-behavior: smooth;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
