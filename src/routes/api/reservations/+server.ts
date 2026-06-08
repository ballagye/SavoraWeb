/**
 * POST /api/reservations
 * Crée une réservation directement en base PostgreSQL via Drizzle ORM.
 * Applique les règles de gestion (validation, quota) et auto-crée la
 * fiche client si elle n'existe pas — sans passer par l'API FastAPI.
 */
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { reservations, clients } from '$lib/server/db/schema';
import { clientExists, maxCovers, reservedCovers, type Period } from '$lib/server/db/queries';

const LUNCH_SLOTS = new Set(['12:00', '12:30', '13:00', '13:30']);
const DINNER_SLOTS = new Set(['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// L'affichage envoyé par le front → le label réel de l'enum PostgreSQL
// (créé par SQLAlchemy avec les noms d'énumération en minuscules).
const CIVILITY_DB: Record<string, 'madame' | 'monsieur' | 'mx'> = {
	Madame: 'madame',
	Monsieur: 'monsieur',
	'Mx.': 'mx'
};

export const POST = async ({ request }: RequestEvent) => {
	const b = await request.json();

	// ── 1. Validation des règles de gestion ────────────────────────────────
	const errors: string[] = [];

	if (!Number.isInteger(b.party_size) || b.party_size < 1 || b.party_size > 6)
		errors.push('Le nombre de couverts doit être entre 1 et 6.');

	const today = new Date().toISOString().slice(0, 10);
	if (!b.date || b.date < today) errors.push('La date ne peut pas être dans le passé.');

	const isLunch = LUNCH_SLOTS.has(b.time_slot);
	const isDinner = DINNER_SLOTS.has(b.time_slot);
	if (!isLunch && !isDinner) errors.push(`Créneau horaire invalide : ${b.time_slot}`);

	const period: Period = isLunch ? 'lunch' : 'dinner';
	if (b.meal_period && b.meal_period !== period)
		errors.push('Le service ne correspond pas au créneau choisi.');

	const civility = CIVILITY_DB[b.civility];
	if (!civility) errors.push('Civilité invalide.');
	if (!b.first_name || !b.last_name || !b.phone) errors.push('Coordonnées incomplètes.');
	if (!b.email || !EMAIL_RE.test(b.email)) errors.push('Adresse e-mail invalide.');
	if (b.terms_accepted !== true)
		errors.push("Les conditions générales doivent être acceptées.");

	if (errors.length > 0) {
		return json({ detail: errors.join(' ') }, { status: 400 });
	}

	// ── 2. Vérification du quota ────────────────────────────────────────────
	const reserved = await reservedCovers(b.date, period);
	const max = await maxCovers(b.date, period);
	if (reserved + b.party_size > max) {
		const remaining = Math.max(0, max - reserved);
		return json(
			{ detail: `Quota atteint pour ce service. Places restantes : ${remaining}.` },
			{ status: 409 }
		);
	}

	// ── 3. Création de la réservation (statut « en attente ») ───────────────
	const [created] = await db
		.insert(reservations)
		.values({
			partySize: b.party_size,
			date: b.date,
			timeSlot: b.time_slot,
			mealPeriod: period,
			civility,
			firstName: b.first_name,
			lastName: b.last_name,
			phone: b.phone,
			email: b.email,
			specialRequests: b.special_requests ?? null,
			saveDataConsent: b.save_data_consent ?? false,
			termsAccepted: b.terms_accepted,
			status: 'pending'
		})
		.returning();

	// ── 4. Auto-création de la fiche client (lien par e-mail) ───────────────
	if (!(await clientExists(b.email))) {
		await db.insert(clients).values({
			civility,
			firstName: b.first_name,
			lastName: b.last_name,
			phone: b.phone,
			email: b.email
		});
	}

	return json(created, { status: 201 });
};
