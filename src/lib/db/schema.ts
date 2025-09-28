import { relations, sql } from "drizzle-orm"
import {
  type AnyPgColumn,
  char,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export function lower(col: AnyPgColumn) {
  return sql`lower(${col})`
}

export const createTable = pgTableCreator((name) => `${name}`)

export const users = createTable(
  "user",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("email_verified", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
    joinedAt: timestamp("joined_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("idx_email").on(t.email),
    uniqueIndex("idx_email_lower").on(lower(t.email)),
    uniqueIndex("idx_username").on(t.username),
    uniqueIndex("idx_username_lower").on(lower(t.username)),
  ],
)

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const accounts = createTable(
  "account",
  {
    userId: uuid("id")
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index("account_user_id_idx").on(account.userId),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => [index("session_user_id_idx").on(session.userId)],
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
)

// export const asyncJobs = createTable("async_jobs", {
//   id: uuid("id").notNull().primaryKey().defaultRandom(),
//   prompt: text("prompt").notNull(),
//   result: text("result"),
//   createdAt: timestamp("created_at", {
//     mode: "date",
//     withTimezone: true,
//   }).defaultNow(),
//   finishedAt: timestamp("finished_at", {
//     mode: "date",
//     withTimezone: true,
//   }),
// })

// export const asyncJobCrosswordRelations = createTable(
//   "async_job_crossword_relation",
//   {
//     jobId: uuid("job_id")
//       .references(() => asyncJobs.id)
//       .notNull(),
//     crosswordId: uuid("crossword_id")
//       .references(() => crosswords.id)
//       .notNull(),
//   },
//   (t) => [
//     uniqueIndex("unique_job_id").on(t.jobId),
//     uniqueIndex("unique_crossword_id").on(t.crosswordId),
//   ],
// )

export const crosswords = createTable("crossword", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  theme: varchar("title", { length: 255 }).notNull(),
  generatedByUserId: uuid("generate_by_user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date", withTimezone: true }),
})

export const crosswordWordOrientation = pgEnum("crossword_word_orientation", [
  "across",
  "down",
])

export const crosswordWords = createTable(
  "crossword_word",
  {
    crosswordId: uuid("crossword_id")
      .notNull()
      .references(() => crosswords.id),
    orientation: crosswordWordOrientation("orientation"),
    row: integer("row").notNull(),
    col: integer("col").notNull(),
    word: varchar("word", { length: 255 }).notNull(),
    clue: text("clue").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.crosswordId, t.word] }),
    index("crossword_word_crossword_id_idx").on(t.crosswordId),
  ],
)

export const crosswordSession = createTable("crossword_session", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  crosswordId: uuid("crossword_id")
    .notNull()
    .references(() => crosswords.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
})

export const crosswordSessionGrid = createTable(
  "crossword_session_grid",
  {
    sessionId: uuid("session_id")
      .notNull()
      .references(() => crosswordSession.id),
    row: integer("row").notNull(),
    col: integer("col").notNull(),
    letter: char("letter", { length: 1 }),
  },
  (t) => [
    primaryKey({ columns: [t.sessionId, t.row, t.col] }),
    index("crossword_session_grid_session_id_idx").on(t.sessionId),
  ],
)
