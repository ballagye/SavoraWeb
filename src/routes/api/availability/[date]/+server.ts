/**
 * GET /api/availability/[date]
 * Proxy vers FastAPI — retourne les places restantes midi/soir pour une date.
 */
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const API = env.API_URL ?? 'http://localhost:8000';

export const GET = async ({ params }: RequestEvent) => {
	const res = await fetch(`${API}/availability/${params.date}`);

	const text = await res.text();
	return new Response(text, {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
};
