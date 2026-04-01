<script lang="ts">
	import { Accordion, Calendar } from 'bits-ui';
	import CaretDown from 'phosphor-svelte/lib/CaretDown';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import ForkKnife from 'phosphor-svelte/lib/ForkKnife';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import Clock from 'phosphor-svelte/lib/Clock';
	import MapPin from 'phosphor-svelte/lib/MapPin';

	let nombreCouverts = $state(2);
	let selectedHoraire = $state('');

	const dejeuner = ['12:00', '12:30', '13:00', '13:30'];
	const diner = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
	let dateValue = $state(today(getLocalTimeZone()));
	let showCalendar = $state(false);
	let showForm = $state(false);

	function formatDate(date: typeof dateValue) {
		return date.toDate(getLocalTimeZone()).toLocaleDateString('fr-FR', {
			weekday: 'short',
			day: 'numeric',
			month: 'short'
		});
	}
</script>

<div class="reservation">
	<div class="accordion-container">
		{#if !showForm}
			<p>
				Nous tenons à vous remercier de l'intérêt porté à notre restaurant. Afin de vous garantir la
				meilleure expérience possible, nous vous invitons à réserver votre table ci-dessous. Notre
				équipe mettra tout en œuvre pour que votre moment chez nous soit inoubliable.
			</p>
			<Accordion.Root type="single">
				<Accordion.Item value="couverts">
					<Accordion.Header>
						<Accordion.Trigger>
							<ForkKnife size="20px" />
							<span class="trigger-label">
								{nombreCouverts === 0
									? 'Nombre de couverts'
									: `${nombreCouverts} couvert${nombreCouverts > 1 ? 's' : ''}`}
							</span>
							<span class="trigger-icon">
								<CaretDown />
							</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content>
						<div class="couverts-buttons">
							{#each [1, 2, 3, 4, 5, 6] as n}
								<button
									onclick={() => (nombreCouverts = n)}
									class="couvert-btn"
									class:active={nombreCouverts === n}
								>
									{n}
								</button>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="date">
					<Accordion.Header>
						<Accordion.Trigger>
							<CalendarBlank size="20px" />
							<span class="trigger-label">Date</span>
							<span class="trigger-icon">
								<CaretDown />
							</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content>
						<div class="date-content">
							<div class="date-presets">
								<button
									class="date-preset-btn"
									class:active={showCalendar}
									onclick={() => (showCalendar = !showCalendar)}
								>
									<CalendarBlank size="22px" />
									<span>Autre</span>
								</button>
							</div>

							{#if showCalendar}
								<Calendar.Root
									type="single"
									weekdayFormat="short"
									fixedWeeks={true}
									locale="fr-FR"
									weekStartsOn={1}
									bind:value={dateValue}
								>
									{#snippet children({ months, weekdays })}
										<Calendar.Header>
											<Calendar.PrevButton>
												<CaretLeft />
											</Calendar.PrevButton>
											<Calendar.Heading />
											<Calendar.NextButton>
												<CaretRight />
											</Calendar.NextButton>
										</Calendar.Header>
										{#each months as month, i (i)}
											<Calendar.Grid>
												<Calendar.GridHead>
													<Calendar.GridRow>
														{#each weekdays as day, i (i)}
															<Calendar.HeadCell>
																{day.slice(0, 2)}
															</Calendar.HeadCell>
														{/each}
													</Calendar.GridRow>
												</Calendar.GridHead>
												<Calendar.GridBody>
													{#each month.weeks as weekDates, i (i)}
														<Calendar.GridRow>
															{#each weekDates as date, i (i)}
																<Calendar.Cell {date} month={month.value}>
																	<Calendar.Day>
																		{date.day}
																	</Calendar.Day>
																</Calendar.Cell>
															{/each}
														</Calendar.GridRow>
													{/each}
												</Calendar.GridBody>
											</Calendar.Grid>
										{/each}
									{/snippet}
								</Calendar.Root>
							{/if}
						</div>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="horaires">
					<Accordion.Header>
						<Accordion.Trigger>
							<Clock size="20px" />
							<span class="trigger-label">
								{selectedHoraire ? selectedHoraire : 'Horaire'}
							</span>
							<span class="trigger-icon">
								<CaretDown />
							</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content>
						<div class="horaires-content">
							<div class="horaires-section">
								<span class="horaires-title">Déjeuner</span>
								<div class="horaires-list">
									{#each dejeuner as h}
										<button
											class="horaire-btn"
											class:active={selectedHoraire === h}
											onclick={() => (selectedHoraire = h)}
										>
											<span class="dot"></span>
											{h}
										</button>
									{/each}
								</div>
							</div>
							<div class="horaires-section">
								<span class="horaires-title">Dîner</span>
								<div class="horaires-list">
									{#each diner as h}
										<button
											class="horaire-btn"
											class:active={selectedHoraire === h}
											onclick={() => (selectedHoraire = h)}
										>
											<span class="dot"></span>
											{h}
										</button>
									{/each}
								</div>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
			<div class="reserver-wrapper">
				<button class="reserver-btn" onclick={() => (showForm = true)}>Réserver</button>
			</div>
		{:else}
			<div class="recap-block">
				<div class="form-header">
					<span class="form-title">Votre réservation</span>
					<button class="modifier-btn" onclick={() => (showForm = false)}>modifier</button>
				</div>
				<div class="recap">
					<div class="recap-item"><ForkKnife size="18px" /><span>{nombreCouverts}</span></div>
					<div class="recap-item">
						<CalendarBlank size="18px" /><span>{formatDate(dateValue)}</span>
					</div>
					<div class="recap-item"><Clock size="18px" /><span>{selectedHoraire || '—'}</span></div>
					<div class="recap-item">
						<MapPin size="18px" />
						<div class="recap-location">
							<span class="recap-location-name">SAIGON</span>
							<span class="recap-location-addr">11 Rue Raymond Losserand, 75014 Paris</span>
						</div>
					</div>
				</div>
			</div>

			<div class="form-scroll">
				<div class="contact-header">
					<button class="back-btn" onclick={() => (showForm = false)}>
						<CaretLeft size="18px" />
					</button>
					<span class="contact-title">Contact</span>
				</div>

				<div class="form">
					<fieldset class="field-group field-group-fieldset">
						<legend class="field-label">Civilité</legend>
						<div class="radio-group">
							<label class="radio-label"
								><input type="radio" name="civilite" value="madame" /> Madame</label
							>
							<label class="radio-label"
								><input type="radio" name="civilite" value="monsieur" /> Monsieur</label
							>
							<label class="radio-label"
								><input type="radio" name="civilite" value="mx" /> Mx.</label
							>
						</div>
					</fieldset>

					<div class="field-row">
						<div class="field-group">
							<label class="field-label" for="prenom">Prénom</label>
							<input id="prenom" type="text" class="field-input" />
						</div>
						<div class="field-group">
							<label class="field-label" for="nom">Nom</label>
							<input id="nom" type="text" class="field-input" />
						</div>
					</div>

					<div class="field-row">
						<div class="field-group">
							<label class="field-label" for="tel">Téléphone</label>
							<div class="phone-input">
								<span class="phone-flag">🇫🇷 +33</span>
								<input
									id="tel"
									type="tel"
									class="field-input phone-field"
									placeholder="6 12 34 56 78"
								/>
							</div>
						</div>
						<div class="field-group">
							<label class="field-label" for="email">Email</label>
							<input id="email" type="email" class="field-input" />
						</div>
					</div>

					<div class="field-group">
						<label class="field-label" for="commentaires">
							Commentaires, préférences ou restrictions alimentaires
							<span class="facultatif">(facultatif)</span>
						</label>
						<textarea id="commentaires" class="field-textarea" rows="3"></textarea>
					</div>

					<div class="checkboxes">
						<label class="checkbox-label"
							><input type="checkbox" /> Sauvegardez les informations pour mes prochaines réservations.</label
						>
						<label class="checkbox-label"
							><input type="checkbox" /> J'accepte les conditions générales d'utilisation du
							service. <span class="required">*</span></label
						>
					</div>

					<button class="submit-btn">Réserver</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.reservation {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fbf0da;
	}

	p {
		text-align: center;
	}

	.accordion-container {
		display: flex;
		flex-direction: column;
		width: 600px;
		height: 630px;
		background-color: white;
		border-radius: 0.75rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
		margin-top: 1.5rem;
		overflow: hidden;
		box-sizing: border-box;
	}

	:global([data-accordion-root]) {
		width: 100%;
		padding: 0 8px;
		box-sizing: border-box;
	}

	:global([data-accordion-item]) {
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 6px;
	}

	:global([data-accordion-trigger]) {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		padding: 7px 12px;
		margin-top: 5px;
		font-size: 0.9375rem;
		font-weight: 500;
		background: none;
		border: none;
		gap: 10px;
		cursor: pointer;
		user-select: none;
		border-radius: 5px;
		transition: background-color 150ms;
	}

	.trigger-label {
		flex: 1;
		text-align: left;
	}

	.trigger-icon {
		display: inline-flex;
		width: 2rem;
		height: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		transition: background-color 150ms;
	}

	.trigger-icon :global(svg) {
		width: 1.125rem;
		height: 1.125rem;
		transition: transform 200ms;
	}

	:global([data-accordion-trigger][data-state='open']) .trigger-icon :global(svg) {
		transform: rotate(180deg);
	}

	:global([data-accordion-trigger]:hover) {
		background-color: #f3f4f6;
	}

	:global([data-accordion-content]) {
		font-size: 0.875rem;
	}

	:global([data-accordion-content][data-state='open']) {
		overflow: visible;
	}

	:global([data-accordion-content][data-state='closed']) {
		overflow: hidden;
		animation: accordionClose 200ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
	}

	@keyframes -global-accordionClose {
		from {
			height: var(--bits-accordion-content-height);
			opacity: 1;
		}
		to {
			height: 0;
			opacity: 0;
		}
	}

	.couverts-buttons {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding: 0.75rem 0 1.25rem;
	}

	.couvert-btn {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 0.5rem;
		border: 1px solid #d1d5db;
		font-weight: 500;
		background-color: white;
		cursor: pointer;
		transition: all 150ms;
	}

	.couvert-btn:hover {
		border-color: black;
		background-color: black;
		color: white;
	}

	.couvert-btn.active {
		border-color: black;
		background-color: black;
		color: white;
	}

	/* Date */
	.date-content {
		padding: 1rem 0 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.date-presets {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
	}

	.date-preset-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 1.25rem;
		border-radius: 0.5rem;
		border: 1px solid #d1d5db;
		background-color: white;
		font-size: 0.8125rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 150ms;
	}

	.date-preset-btn:hover {
		border-color: black;
		background-color: black;
		color: white;
	}

	.date-preset-btn.active {
		border-color: black;
		background-color: black;
		color: white;
	}

	.horaires-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.75rem 0.5rem 1rem;
		max-height: 300px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #e5e7eb transparent;
	}

	.horaires-content::-webkit-scrollbar {
		width: 4px;
	}

	.horaires-content::-webkit-scrollbar-track {
		background: transparent;
	}

	.horaires-content::-webkit-scrollbar-thumb {
		background-color: #e5e7eb;
		border-radius: 99px;
	}

	.horaires-content::-webkit-scrollbar-button:start:decrement,
	.horaires-content::-webkit-scrollbar-button:end:increment,
	.horaires-content::-webkit-scrollbar-button:start:increment,
	.horaires-content::-webkit-scrollbar-button:end:decrement {
		height: 0;
		width: 0;
		background: transparent;
	}

	.horaires-title {
		display: block;
		font-size: 0.8125rem;
		font-weight: 600;
		color: #6b7280;
		margin-bottom: 0.5rem;
		padding-left: 0.25rem;
	}

	.horaires-list {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.horaire-btn {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		width: 100%;
		padding: 0.625rem 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
		background-color: white;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 150ms;
		text-align: left;
	}

	.horaire-btn:hover {
		border-color: #d1d5db;
		background-color: #f3f4f6;
	}

	.horaire-btn.active {
		border-color: black;
		background-color: black;
		color: white;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background-color: #22c55e;
		flex-shrink: 0;
	}

	.horaire-btn.active .dot {
		background-color: white;
	}

	:global([data-calendar-root]) {
		width: 100%;
		padding: 0 0.5rem;
		box-sizing: border-box;
	}

	:global([data-calendar-header]) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	:global([data-calendar-prev-button]),
	:global([data-calendar-next-button]) {
		display: inline-flex;
		width: 2rem;
		height: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.375rem;
		border: none;
		background: none;
		cursor: pointer;
		transition: background-color 150ms;
	}

	:global([data-calendar-prev-button]:hover),
	:global([data-calendar-next-button]:hover) {
		background-color: #f3f4f6;
	}

	:global([data-calendar-heading]) {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	:global([data-calendar-grid]) {
		width: 100%;
		border-collapse: collapse;
	}

	:global([data-calendar-head-cell]) {
		text-align: center;
		font-size: 0.75rem;
		color: #9ca3af;
		font-weight: 400;
		padding-bottom: 0.5rem;
		width: calc(100% / 7);
	}

	:global([data-calendar-grid-row]) {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	:global([data-calendar-cell]) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 0.125rem;
	}

	:global([data-calendar-day]) {
		display: inline-flex;
		width: 2.25rem;
		height: 2.25rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		border: 1px solid transparent;
		background: none;
		cursor: pointer;
		transition: all 150ms;
	}

	:global([data-calendar-day]:hover) {
		border-color: #d1d5db;
		background-color: #f3f4f6;
	}

	:global([data-calendar-day][data-selected]) {
		background-color: black;
		color: white;
		border-color: black;
		font-weight: 500;
	}

	:global([data-calendar-day][data-today]) {
		font-weight: 600;
		border-color: #d1d5db;
	}

	:global([data-calendar-day][data-outside-month]) {
		color: #d1d5db;
		pointer-events: none;
	}

	:global([data-calendar-day][data-disabled]) {
		opacity: 0.3;
		pointer-events: none;
	}

	.field-group-fieldset {
		border: none;
		margin: 0;
		padding: 0;
		min-width: 0;
	}

	.reserver-wrapper {
		margin-top: auto;
		padding: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.reserver-btn {
		width: 100%;
		padding: 0.75rem;
		background-color: white;
		color: #7f1d1d;
		border: 2px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition: border-color 150ms;
	}

	.reserver-btn:hover {
		border-color: #7f1d1d;
	}

	.recap-block {
		background-color: #f3f4f6;
		border-bottom: 1px solid #e5e7eb;
		flex-shrink: 0;
	}

	.form-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem 0.75rem;
	}

	.form-title {
		font-size: 1.0625rem;
		font-weight: 600;
	}

	.modifier-btn {
		background: none;
		border: none;
		font-size: 0.875rem;
		color: #374151;
		cursor: pointer;
		text-decoration: underline;
		padding: 0;
	}

	.contact-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem 0.5rem;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: #374151;
		border-radius: 0.375rem;
		transition: background-color 150ms;
	}

	.back-btn:hover {
		background-color: #f3f4f6;
	}

	.contact-title {
		font-size: 1.0625rem;
		font-weight: 600;
	}

	.recap-location {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.recap-location-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.recap-location-addr {
		font-size: 0.75rem;
		color: #6b7280;
		font-weight: 400;
	}

	.recap {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 1.5rem 1.25rem;
	}

	.recap-item {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-scroll {
		overflow-y: auto;
		flex: 1;
		scrollbar-width: thin;
		scrollbar-color: #e5e7eb transparent;
	}

	.form-scroll::-webkit-scrollbar {
		width: 4px;
	}

	.form-scroll::-webkit-scrollbar-track {
		background: transparent;
	}

	.form-scroll::-webkit-scrollbar-thumb {
		background-color: #e5e7eb;
		border-radius: 99px;
	}

	.form-scroll::-webkit-scrollbar-button:start:decrement,
	.form-scroll::-webkit-scrollbar-button:end:increment,
	.form-scroll::-webkit-scrollbar-button:start:increment,
	.form-scroll::-webkit-scrollbar-button:end:decrement {
		height: 0;
		width: 0;
		background: transparent;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.25rem 1.5rem 1.5rem;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		flex: 1;
	}

	.field-label {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.facultatif {
		font-weight: 400;
		color: #6b7280;
	}

	.field-row {
		display: flex;
		gap: 1rem;
	}

	.field-input {
		height: 2.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		width: 100%;
		box-sizing: border-box;
		outline: none;
		transition: border-color 150ms;
	}

	.field-input:focus {
		border-color: #9ca3af;
	}

	.phone-input {
		display: flex;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		overflow: hidden;
		height: 2.5rem;
		box-sizing: border-box;
	}

	.phone-flag {
		display: flex;
		align-items: center;
		padding: 0 0.625rem;
		font-size: 0.8125rem;
		background-color: #f9fafb;
		border-right: 1px solid #e5e7eb;
		white-space: nowrap;
	}

	.phone-field {
		border: none;
		border-radius: 0;
		flex: 1;
	}

	.field-textarea {
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		resize: none;
		outline: none;
		font-family: inherit;
		transition: border-color 150ms;
	}

	.field-textarea:focus {
		border-color: #9ca3af;
	}

	.radio-group {
		display: flex;
		gap: 1.5rem;
	}

	.radio-label {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.checkboxes {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.8125rem;
		cursor: pointer;
		line-height: 1.4;
	}

	.required {
		color: #ef4444;
		font-weight: 600;
	}

	.submit-btn {
		width: 100%;
		padding: 0.75rem;
		background-color: #7f1d1d;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		margin-top: 0.5rem;
		transition: background-color 150ms;
	}

	.submit-btn:hover {
		background-color: #6b1919;
	}
</style>
