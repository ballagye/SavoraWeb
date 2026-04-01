<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state(new Date());

	let hours = $derived(String(time.getHours()).padStart(2, '0'));
	let minutes = $derived(String(time.getMinutes()).padStart(2, '0'));

	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="presentation">
	<svg
		class="logo"
		viewBox="0 0 1400 270"
		preserveAspectRatio="xMinYMid meet"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="SAVORA"
	>
		<text class="logo-text" x="40" y="210" text-anchor="start">SAVORA</text>
	</svg>
</div>

<style>
	.logo {
		width: 100%;
		height: auto;
	}

	.logo-text {
		font-family: 'Britney', sans-serif;
		font-weight: 700;
		font-size: 200px;
		letter-spacing: 4px;
		fill: transparent;
		stroke: #bab2a2;
		stroke-width: 1.5px;
		stroke-dasharray: 3000;
		stroke-dashoffset: 3000;
		animation:
			drawStroke 3s cubic-bezier(0.87, 0, 0.13, 1) 0.2s forwards,
			fillIn 2s cubic-bezier(0.87, 0, 0.13, 1) 2.65s forwards;
	}

	@keyframes drawStroke {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fillIn {
		to {
			fill: #fbf0da;
			stroke-width: 0;
		}
	}

	.presentation {
		background-color: #1e1005;
		width: 100vw;
		height: 953px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}
</style>
