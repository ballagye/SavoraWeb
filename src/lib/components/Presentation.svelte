<section class="hero" id="hero">
	<div class="hero-title-wrap">
		<h1 class="hero-title">SAVORA</h1>
	</div>

	<aside class="hero-aside">
		<div class="aside-body">
			<span class="aside-label">Saveur</span>
			<p class="aside-desc">
				Un restaurant gastronomique où chaque séquence raconte l'histoire d'une saison.
			</p>
		</div>
		<div class="aside-scroll">
			<span>DÉFILER</span>
			<div class="scroll-line"></div>
		</div>
	</aside>
</section>

<style>
	.hero {
		position: relative;
		height: 100vh;
		min-height: 600px;
		overflow: hidden;
		background-color: #0e0804;
		display: flex;
		align-items: flex-end;
	}

	.hero-title-wrap {
		width: 100%;
		padding: 0 0 0.01em 0.012em;
		line-height: 1;
	}

	.hero-title {
		font-family: 'Britney', sans-serif;
		font-weight: 700;
		font-size: 21vw;
		line-height: 0.82;
		color: #fbf0da;
		margin: 0;
		letter-spacing: -0.015em;
		white-space: nowrap;
	}

	.hero-aside {
		position: absolute;
		right: 2.5rem;
		bottom: 2.5rem;
		width: 230px;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.aside-body {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.aside-label {
		font-family: 'Britney', sans-serif;
		font-size: 2.25rem;
		font-weight: 400;
		color: #fbf0da;
		letter-spacing: 0.06em;
		line-height: 1;
	}

	.aside-desc {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.8125rem;
		font-weight: 300;
		color: rgba(251, 240, 218, 0.55);
		line-height: 1.8;
		margin: 0;
	}

	.aside-scroll {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.aside-scroll span {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.5625rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: rgba(251, 240, 218, 0.35);
	}

	.scroll-line {
		flex: 1;
		height: 1px;
		background-color: rgba(251, 240, 218, 0.2);
	}
</style>
