import {
    pgTable,
    foreignKey,
    pgEnum,
    uuid,
    uniqueIndex,
    varchar,
    integer,
    timestamp,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const keyStatus = pgEnum('key_status', [
    'default',
    'valid',
    'invalid',
    'expired',
])
export const keyType = pgEnum('key_type', [
    'aead-ietf',
    'aead-det',
    'hmacsha512',
    'hmacsha256',
    'auth',
    'shorthash',
    'generichash',
    'kdf',
    'secretbox',
    'secretstream',
    'stream_xchacha20',
])
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum('code_challenge_method', [
    's256',
    'plain',
])
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified'])
export const factorType = pgEnum('factor_type', ['totp', 'webauthn'])

export const competitionPlayer = pgTable('competition_player', {
    userId: uuid('user_id')
        .notNull()
        .references(() => users.userId),
    competitionId: uuid('competition_id')
        .notNull()
        .references(() => competition.competitionId),
    teamId: uuid('team_id').references(() => team.teamId),
})

export const users = pgTable(
    'users',
    {
        userId: uuid('user_id').primaryKey().notNull(),
        name: varchar('name').notNull(),
        role: varchar('role'),
        profilePic: varchar('profile_pic'),
        clerkId: varchar('clerk_id').notNull(),
    },
    (table) => {
        return {
            idxUsersClerkId: uniqueIndex('idx_users_clerk_id').on(
                table.clerkId
            ),
        }
    }
)

export const competition = pgTable('competition', {
    competitionId: uuid('competition_id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    teamSize: integer('team_size').notNull(),
    numTeams: integer('num_teams').notNull(),
    creatorId: uuid('creator_id')
        .notNull()
        .references(() => users.userId),
    numSubs: integer('num_subs').notNull(),
    startDate: timestamp('start_date', { withTimezone: true, mode: 'string' }),
})

export const team = pgTable('team', {
    teamId: uuid('team_id').defaultRandom().primaryKey().notNull(),
    name: varchar('name').notNull(),
    captainId: uuid('captain_id')
        .notNull()
        .references(() => users.userId),
    competitionId: uuid('competition_id')
        .notNull()
        .references(() => competition.competitionId),
})
