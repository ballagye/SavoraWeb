/**
 * POST /api/reservations
 * Proxy vers FastAPI — le navigateur n'appelle jamais FastAPI directement.
 * En prod : changer API_URL dans .env
 */
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const API = env.API_URL ?? 'http://localhost:8000';

export const POST = async ({ request }: RequestEvent) => {
	const body = await request.text();

	const res = await fetch(`${API}/reservations/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body
	});

	const text = await res.text();
	return new Response(text, {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
};
