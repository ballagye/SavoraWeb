<script lang="ts">
	import DiningHours from '$lib/components/DiningHours.svelte';
	import Reservation from '$lib/components/Reservation.svelte';
	import Presentation from '$lib/components/Presentation.svelte';
</script>

<Presentation />
<DiningHours />
<Reservation />

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}
</style>
