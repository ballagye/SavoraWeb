<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.intersectionRatio >= 0.3) visible = true;
			},
			{ threshold: 0.3 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="manifeste" class="manifeste" bind:this={sectionEl}>
	<p class="label">Philosophie · Notre approche</p>

	<h2 class="word" class:visible>GASTRONOMIE</h2>

	<p class="desc" class:visible>
		Chaque séquence est une invitation au voyage.<br />De la vigne à l'assiette, une cuisine de
		l'instant.
	</p>
</section>

<style>
	.manifeste {
		background-color: #fbf0da;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding: 7rem 2rem;
	}

	.label {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.625rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: rgba(186, 178, 162, 0.7);
		margin: 0;
		text-align: center;
	}

	.word {
		font-family: 'Britney', sans-serif;
		font-size: clamp(48px, 10.5vw, 170px);
		font-weight: 400;
		color: #1e1005;
		line-height: 1;
		margin: 0;
		opacity: 0;
		transform: translateY(40px);
		transition:
			opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
			transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.word.visible {
		opacity: 1;
		transform: none;
	}

	.desc {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.9375rem;
		font-weight: 300;
		color: rgba(30, 16, 5, 0.45);
		text-align: center;
		line-height: 1.9;
		margin: 0;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.9s ease 0.3s,
			transform 0.9s ease 0.3s;
	}

	.desc.visible {
		opacity: 1;
		transform: none;
	}
</style>
