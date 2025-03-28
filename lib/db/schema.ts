import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean,
  integer,
  json,
  varchar,
  uuid
} from 'drizzle-orm/pg-core'

// Usuarios
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: text('password').notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  apellido: varchar('apellido', { length: 100 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('USER'),
  emailVerified: boolean('email_verified').notNull().default(false),
  twoFactorEnabled: boolean('two_factor_enabled').notNull().default(false),
  twoFactorSecret: text('two_factor_secret'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  dni: varchar('dni', { length: 20 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  city: text('city'),
  province: text('province'),
  postalCode: varchar('postal_code', { length: 10 }),
  lastLogin: timestamp('last_login'),
  isActive: boolean('is_active').default(true),
  notificationPreferences: json('notification_preferences').$type<{
    email: boolean,
    sms: boolean,
    whatsapp: boolean
  }>()
})

// Trámites
export const procedures = pgTable('procedures', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(),
  status: text('status').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  documents: json('documents').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  assignedTo: integer('assigned_to').references(() => users.id),
  comments: json('comments').$type<{
    userId: number,
    comment: string,
    timestamp: string
  }[]>()
})

// Pagos
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  amount: integer('amount').notNull(),
  concept: text('concept').notNull(),
  status: text('status').notNull(),
  paymentMethod: text('payment_method'),
  transactionId: text('transaction_id'),
  createdAt: timestamp('created_at').defaultNow(),
  paidAt: timestamp('paid_at'),
  dueDate: timestamp('due_date'),
  receipt: text('receipt')
})

// Turnos
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(),
  date: timestamp('date').notNull(),
  status: text('status').notNull(),
  area: text('area').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  cancelledAt: timestamp('cancelled_at'),
  reminderSent: boolean('reminder_sent').default(false)
})

// Mensajes
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(),
  subject: text('subject').notNull(),
  content: text('content').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  readAt: timestamp('read_at'),
  attachments: json('attachments').$type<string[]>()
})

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const loginAttempts = pgTable('login_attempts', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  success: boolean('success').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert

export type LoginAttempt = typeof loginAttempts.$inferSelect
export type NewLoginAttempt = typeof loginAttempts.$inferInsert

// DB Client
const db = drizzle(sql)

export default db 