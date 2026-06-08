/**
 * GET /api/availability/[date]
 * Calcule les places restantes midi/soir pour une date,
 * directement en base PostgreSQL via Drizzle ORM (sans proxy FastAPI).
 */
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { maxCovers, reservedCovers } from '$lib/server/db/queries';

export const GET = async ({ params }: RequestEvent) => {
	const date = params.date!;

	const [lunchMax, dinnerMax, lunchRes, dinnerRes] = await Promise.all([
		maxCovers(date, 'lunch'),
		maxCovers(date, 'dinner'),
		reservedCovers(date, 'lunch'),
		reservedCovers(date, 'dinner')
	]);

	return json({
		date,
		lunch_available: lunchRes < lunchMax,
		dinner_available: dinnerRes < dinnerMax,
		lunch_remaining: Math.max(0, lunchMax - lunchRes),
		dinner_remaining: Math.max(0, dinnerMax - dinnerRes)
	});
};
