-- CreateTable
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "dni" VARCHAR(20) NOT NULL UNIQUE,
    "phone" VARCHAR(20),
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postal_code" VARCHAR(10),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP,
    "is_active" BOOLEAN DEFAULT true,
    "notification_preferences" JSONB
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "procedures" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"(id),
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "documents" JSONB,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP,
    "assigned_to" INTEGER REFERENCES "users"(id),
    "comments" JSONB
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "payments" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"(id),
    "amount" INTEGER NOT NULL,
    "concept" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_method" TEXT,
    "transaction_id" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP,
    "due_date" TIMESTAMP,
    "receipt" TEXT
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "appointments" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"(id),
    "type" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "status" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "cancelled_at" TIMESTAMP,
    "reminder_sent" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"(id),
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP,
    "attachments" JSONB
);

-- CreateIndexes
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_dni_idx" ON "users"("dni");
CREATE INDEX IF NOT EXISTS "procedures_user_id_idx" ON "procedures"("user_id");
CREATE INDEX IF NOT EXISTS "procedures_status_idx" ON "procedures"("status");
CREATE INDEX IF NOT EXISTS "payments_user_id_idx" ON "payments"("user_id");
CREATE INDEX IF NOT EXISTS "payments_status_idx" ON "payments"("status");
CREATE INDEX IF NOT EXISTS "appointments_user_id_idx" ON "appointments"("user_id");
CREATE INDEX IF NOT EXISTS "appointments_date_idx" ON "appointments"("date");
CREATE INDEX IF NOT EXISTS "messages_user_id_idx" ON "messages"("user_id");
CREATE INDEX IF NOT EXISTS "messages_read_idx" ON "messages"("read"); 