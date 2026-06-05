/**
 * Schéma Drizzle — miroir des tables créées par SQLAlchemy/FastAPI.
 * Utilisé uniquement pour la référence de types TypeScript.
 * Les migrations sont gérées par FastAPI (SQLAlchemy), pas par Drizzle.
 */
import {
	pgTable,
	pgEnum,
	serial,
	integer,
	varchar,
	text,
	boolean,
	date,
	timestamp
} from 'drizzle-orm/pg-core';

export const mealPeriodEnum        = pgEnum('mealperiod',         ['lunch', 'dinner']);
export const reservationStatusEnum = pgEnum('reservationstatus',  ['pending', 'confirmed', 'refused', 'cancelled']);
export const civilityEnum          = pgEnum('civility',           ['Madame', 'Monsieur', 'Mx.']);

export const reservations = pgTable('reservations', {
	id:               serial('id').primaryKey(),
	createdAt:        timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt:        timestamp('updated_at', { withTimezone: true }),
	partySize:        integer('party_size').notNull(),
	date:             date('date').notNull(),
	timeSlot:         varchar('time_slot', { length: 5 }).notNull(),
	mealPeriod:       mealPeriodEnum('meal_period').notNull(),
	civility:         civilityEnum('civility').notNull(),
	firstName:        varchar('first_name', { length: 100 }).notNull(),
	lastName:         varchar('last_name', { length: 100 }).notNull(),
	phone:            varchar('phone', { length: 20 }).notNull(),
	email:            varchar('email', { length: 200 }).notNull(),
	specialRequests:  text('special_requests'),
	saveDataConsent:  boolean('save_data_consent').default(false),
	termsAccepted:    boolean('terms_accepted').default(false),
	status:           reservationStatusEnum('status').default('pending').notNull(),
	staffNote:        text('staff_note')
});

export const dailyQuotas = pgTable('daily_quotas', {
	id:        serial('id').primaryKey(),
	date:      date('date').notNull(),
	mealPeriod: mealPeriodEnum('meal_period').notNull(),
	maxCovers: integer('max_covers').notNull().default(15)
});

export type Reservation    = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
