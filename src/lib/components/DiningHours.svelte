<script lang="ts">
	import Day from '$lib/assets/day.svg';
</script>

<section id="dining">
	<div class="column">
		<div class="info">
			<img src={Day} alt="day" />
			<h3>Au déjeuner</h3>
			<h3>12h-14h</h3>
		</div>
		<h3>Aube</h3>
		<h3>Service en 15 séquences</h3>
		<h3>Menu avec options végétariennes</h3>
		<p>120 euros</p>
	</div>

	<div class="column">
		<div class="info">
			<img src={Day} alt="day" />
			<h3>Au dîner</h3>
			<h3>19h - 22h</h3>
		</div>
		<h3>Crépuscule</h3>
		<h3>Service en 25 séquences</h3>
		<h3>Menu avec options végétariennes</h3>
		<p>220 euros</p>
	</div>
</section>

<style>
	h3 {
		margin: 0px;
	}

	#dining {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		background-color: #fbf0da;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.info {
		padding-bottom: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
