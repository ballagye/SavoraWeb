<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Presentation from '$lib/components/Presentation.svelte';
	import Philosophy from '$lib/components/Philosophy.svelte';
	import Manifeste from '$lib/components/Manifeste.svelte';
	import DiningHours from '$lib/components/DiningHours.svelte';
	import Reservation from '$lib/components/Reservation.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />
<Presentation />
<Philosophy />
<Manifeste />
<DiningHours />
<Reservation />
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
