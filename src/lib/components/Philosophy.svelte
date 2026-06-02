<section id="philosophy" class="philosophy">
	<!-- ── Top editorial grid ── -->
	<div class="grid">
		<div class="grid-label">
			<span class="label-line">Notre</span>
			<span class="label-line">Cuisine</span>
			<span class="label-sub">(SAVOIR-FAIRE)</span>
			<span class="label-en">GASTRONOMIE</span>
		</div>

		<div class="grid-image">
			<div class="image-frame"></div>
		</div>

		<div class="grid-text">
			<p>
				Chez Savora, nous concevons chaque service comme une narration. Les saisons dictent nos
				choix, les producteurs inspirent nos recettes, et l'exigence guide chaque geste.
			</p>
			<p>
				De la vigne à l'assiette, chaque ingrédient est sélectionné avec soin pour composer une
				expérience unique, à la fois intime et inoubliable.
			</p>
			<a href="#dining" class="cta-btn">Nos menus →</a>
		</div>
	</div>

	<!-- ── Big full-width text ── -->
	<div class="big-text" aria-hidden="true">
		<p class="big-line">CHAQUE</p>
		<p class="big-line">PLAT EST</p>
		<p class="big-line">UN VOYAGE</p>
	</div>
</section>

<style>
	.philosophy {
		background-color: #fbf0da;
		overflow: hidden;
	}

	/* ── Grid ────────────────────────────────────────────────────── */
	.grid {
		display: grid;
		grid-template-columns: 110px 1fr 300px;
		gap: 0 3rem;
		padding: 7rem 3rem 0;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Left label column */
	.grid-label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-top: 0.5rem;
	}

	.label-line {
		font-family: 'Britney', sans-serif;
		font-size: 1.75rem;
		font-weight: 400;
		color: #1e1005;
		line-height: 1.1;
		display: block;
	}

	.label-sub {
		display: block;
		font-family: 'Aeonik', sans-serif;
		font-size: 0.625rem;
		letter-spacing: 0.12em;
		color: #bab2a2;
		margin-top: 0.75rem;
	}

	.label-en {
		display: block;
		font-family: 'Aeonik', sans-serif;
		font-size: 0.5625rem;
		letter-spacing: 0.22em;
		color: #7f1d1d;
		margin-top: 0.25rem;
	}

	/* Center image column */
	.grid-image {
		align-self: start;
	}

	.image-frame {
		width: 100%;
		aspect-ratio: 4 / 5;
		background-color: #1e1005;
	}

	/* Right text column */
	.grid-text {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 0.5rem;
	}

	.grid-text p {
		font-family: 'Aeonik', sans-serif;
		font-size: 0.9375rem;
		font-weight: 300;
		color: rgba(30, 16, 5, 0.65);
		line-height: 1.85;
		margin: 0;
	}

	.cta-btn {
		display: inline-block;
		margin-top: 0.5rem;
		font-family: 'Aeonik', sans-serif;
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #1e1005;
		text-decoration: none;
		border: 1px solid rgba(30, 16, 5, 0.3);
		padding: 0.65rem 1.5rem;
		border-radius: 100px;
		transition:
			background-color 200ms,
			border-color 200ms,
			color 200ms;
		width: fit-content;
	}

	.cta-btn:hover {
		background-color: #1e1005;
		border-color: #1e1005;
		color: #fbf0da;
	}

	/* ── Big text ─────────────────────────────────────────────── */
	.big-text {
		padding: 5rem 0 0;
		overflow: hidden;
	}

	.big-line {
		font-family: 'Britney', sans-serif;
		font-weight: 400;
		font-size: clamp(80px, 14vw, 220px);
		line-height: 0.92;
		color: #1e1005;
		margin: 0;
		padding: 0 0.3rem;
		display: block;
	}

	.big-line:last-child {
		padding-bottom: 0;
	}
</style>
