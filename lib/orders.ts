import { neon } from "@neondatabase/serverless";
import { randomBytes, randomInt } from "node:crypto";
import type { OrderStatus } from "./order-status";

export type Order = {
  id: number;
  order_number: number;
  public_token: string;
  access_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  equipment: string;
  issue: string;
  status: OrderStatus;
  public_note: string | null;
  internal_note: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderEvent = { id: number; status: OrderStatus; note: string | null; created_at: string };

function database() {
  if (!process.env.DATABASE_URL) throw new Error("Falta configurar DATABASE_URL");
  return neon(process.env.DATABASE_URL);
}

let initialized: Promise<void> | null = null;
async function ensureSchema() {
  if (!initialized) initialized = (async () => {
    const sql = database();
    await sql`CREATE SEQUENCE IF NOT EXISTS techpaws_order_number START 1001`;
    await sql`CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number INTEGER NOT NULL UNIQUE DEFAULT nextval('techpaws_order_number'),
      public_token VARCHAR(64) NOT NULL UNIQUE,
      access_code VARCHAR(8) NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT,
      equipment TEXT NOT NULL,
      issue TEXT NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'received',
      public_note TEXT,
      internal_note TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await sql`CREATE TABLE IF NOT EXISTS order_events (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      status VARCHAR(32) NOT NULL,
      note TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await sql`CREATE INDEX IF NOT EXISTS orders_updated_idx ON orders(updated_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS order_events_order_idx ON order_events(order_id, created_at)`;
  })();
  return initialized;
}

export async function listOrders() {
  await ensureSchema();
  return await database()`SELECT * FROM orders ORDER BY updated_at DESC` as unknown as Order[];
}

export async function createOrder(input: Omit<Order, "id" | "order_number" | "public_token" | "access_code" | "created_at" | "updated_at">) {
  await ensureSchema();
  const sql = database();
  const token = randomBytes(24).toString("hex");
  const code = String(randomInt(100000, 1000000));
  const rows = await sql`INSERT INTO orders (public_token, access_code, customer_name, customer_phone, customer_email, equipment, issue, status, public_note, internal_note)
    VALUES (${token}, ${code}, ${input.customer_name}, ${input.customer_phone}, ${input.customer_email}, ${input.equipment}, ${input.issue}, ${input.status}, ${input.public_note}, ${input.internal_note}) RETURNING *` as unknown as Order[];
  const order = rows[0];
  await sql`INSERT INTO order_events (order_id, status, note) VALUES (${order.id}, ${order.status}, ${order.public_note || "Orden creada"})`;
  return order;
}

export async function updateOrder(id: number, input: Pick<Order, "status" | "public_note" | "internal_note">) {
  await ensureSchema();
  const sql = database();
  const current = await sql`SELECT * FROM orders WHERE id = ${id}` as unknown as Order[];
  if (!current[0]) return null;
  const rows = await sql`UPDATE orders SET status=${input.status}, public_note=${input.public_note}, internal_note=${input.internal_note}, updated_at=NOW() WHERE id=${id} RETURNING *` as unknown as Order[];
  if (current[0].status !== input.status || current[0].public_note !== input.public_note) {
    await sql`INSERT INTO order_events (order_id, status, note) VALUES (${id}, ${input.status}, ${input.public_note})`;
  }
  return rows[0];
}

export async function getPublicOrder(token: string) {
  await ensureSchema();
  const sql = database();
  const orders = await sql`SELECT * FROM orders WHERE public_token=${token}` as unknown as Order[];
  if (!orders[0]) return null;
  const events = await sql`SELECT id, status, note, created_at FROM order_events WHERE order_id=${orders[0].id} ORDER BY created_at ASC` as unknown as OrderEvent[];
  return { order: orders[0], events };
}

export async function findOrderToken(orderNumber: number, accessCode: string) {
  await ensureSchema();
  const rows = await database()`SELECT public_token FROM orders WHERE order_number=${orderNumber} AND access_code=${accessCode}` as unknown as { public_token: string }[];
  return rows[0]?.public_token ?? null;
}

export async function findOrderTokenByCustomer(customerName: string, phoneLast4: string) {
  await ensureSchema();
  const rows = await database()`SELECT public_token FROM orders
    WHERE LOWER(TRIM(customer_name)) = LOWER(TRIM(${customerName}))
      AND RIGHT(REGEXP_REPLACE(customer_phone, '[^0-9]', '', 'g'), 4) = ${phoneLast4}
    ORDER BY updated_at DESC LIMIT 1` as unknown as { public_token: string }[];
  return rows[0]?.public_token ?? null;
}
