/**
 * Couche d'accès aux données via Drizzle ORM.
 * Ces fonctions interrogent directement PostgreSQL (lecture/écriture),
 * sans passer par l'API FastAPI.
 */
import { and, eq, inArray, sql } from 'drizzle-orm';
import { db } from './index';
import { reservations, clients, dailyQuotas } from './schema';

export type Period = 'lunch' | 'dinner';

/** Capacité par défaut d'un service si aucun quota n'est défini en base. */
export const DEFAULT_MAX_COVERS = 15;

/** Somme des couverts déjà réservés (en attente + confirmés) pour un service. */
export async function reservedCovers(date: string, period: Period): Promise<number> {
	const [row] = await db
		.select({ total: sql<number>`coalesce(sum(${reservations.partySize}), 0)` })
		.from(reservations)
		.where(
			and(
				eq(reservations.date, date),
				eq(reservations.mealPeriod, period),
				inArray(reservations.status, ['pending', 'confirmed'])
			)
		);
	return Number(row?.total ?? 0);
}

/** Capacité maximale d'un service (quota défini en base, sinon valeur par défaut). */
export async function maxCovers(date: string, period: Period): Promise<number> {
	const [q] = await db
		.select({ max: dailyQuotas.maxCovers })
		.from(dailyQuotas)
		.where(and(eq(dailyQuotas.date, date), eq(dailyQuotas.mealPeriod, period)));
	return q?.max ?? DEFAULT_MAX_COVERS;
}

/** Vrai si la fiche client existe déjà (rapprochement par e-mail). */
export async function clientExists(email: string): Promise<boolean> {
	const rows = await db.select({ id: clients.id }).from(clients).where(eq(clients.email, email));
	return rows.length > 0;
}
