<script lang="ts">
	import Day from '$lib/assets/day.svg';
	import Night from '$lib/assets/night.svg';
</script>

<section id="dining">
	<header class="section-head">
		<span class="label">Nos offres</span>
		<h2>Deux expériences,<br />une seule exigence</h2>
	</header>

	<div class="menus">
		<article class="menu">
			<img class="icon" src={Day} alt="" aria-hidden="true" />
			<p class="time">12 h — 14 h</p>
			<h3 class="name">Aube</h3>
			<ul class="details">
				<li>Service en 15 séquences</li>
				<li>Options végétariennes disponibles</li>
			</ul>
			<div class="price-block">
				<span class="service-type">Au déjeuner</span>
				<span class="price">120 €</span>
			</div>
		</article>

		<div class="sep" aria-hidden="true"></div>

		<article class="menu">
			<img class="icon" src={Night} alt="" aria-hidden="true" />
			<p class="time">19 h — 22 h</p>
			<h3 class="name">Crépuscule</h3>
			<ul class="details">
				<li>Service en 25 séquences</li>
				<li>Options végétariennes disponibles</li>
			</ul>
			<div class="price-block">
				<span class="service-type">Au dîner</span>
				<span class="price">220 €</span>
			</div>
		</article>
	</div>

	<div class="note">
		<span>Menus dégustation tout compris, hors boissons</span>
	</div>
</section>

<style>
	#dining {
		background-color: #fbf0da;
		padding: 7rem 2rem 5rem;
	}

	.section-head {
		text-align: center;
		margin-bottom: 5rem;
	}

	.label {
		display: inline-block;
		font-size: 0.6875rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #7f1d1d;
		margin-bottom: 1.25rem;
		font-family: 'Aeonik', sans-serif;
	}

	h2 {
		font-family: 'Britney', sans-serif;
		font-size: clamp(2.25rem, 4vw, 3.5rem);
		font-weight: 400;
		color: #1e1005;
		margin: 0;
		line-height: 1.15;
	}

	.menus {
		display: flex;
		align-items: stretch;
		justify-content: center;
		max-width: 820px;
		margin: 0 auto;
	}

	.menu {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 3rem;
	}

	.icon {
		width: 80px;
		height: 80px;
		opacity: 0.45;
		margin-bottom: 2rem;
	}

	.time {
		font-size: 0.6875rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #bab2a2;
		font-family: 'Aeonik', sans-serif;
		margin: 0 0 0.75rem;
	}

	.name {
		font-family: 'Britney', sans-serif;
		font-size: clamp(3rem, 5vw, 4.5rem);
		font-weight: 400;
		color: #1e1005;
		margin: 0 0 1.5rem;
		line-height: 1;
	}

	.details {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.details li {
		font-size: 0.875rem;
		color: #5a4a3a;
		font-family: 'Aeonik', sans-serif;
		line-height: 1.5;
	}

	.price-block {
		margin-top: auto;
		padding-top: 2rem;
		border-top: 1px solid rgba(186, 178, 162, 0.55);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.service-type {
		font-size: 0.6875rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #bab2a2;
		font-family: 'Aeonik', sans-serif;
	}

	.price {
		font-family: 'Britney', sans-serif;
		font-size: 2.75rem;
		font-weight: 400;
		color: #1e1005;
		line-height: 1.1;
	}

	.sep {
		width: 1px;
		background-color: rgba(186, 178, 162, 0.45);
		align-self: stretch;
		margin: 0 0 2rem;
	}

	.note {
		text-align: center;
		margin-top: 3rem;
	}

	.note span {
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		color: rgba(186, 178, 162, 0.7);
		font-family: 'Aeonik', sans-serif;
	}
</style>
