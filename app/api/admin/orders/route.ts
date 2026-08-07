import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/admin-auth";
import { createOrder, listOrders } from "../../../../lib/orders";
import { isOrderStatus } from "../../../../lib/order-status";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try { return NextResponse.json({ orders: await listOrders() }); }
  catch { return NextResponse.json({ error: "No se pudo conectar con la base de datos" }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || !body.customer_name?.trim() || !body.customer_phone?.trim() || !body.equipment?.trim() || !body.issue?.trim() || !isOrderStatus(body.status)) {
    return NextResponse.json({ error: "Completá los campos obligatorios" }, { status: 400 });
  }
  if (body.customer_name.trim().split(/\s+/).length < 2) {
    return NextResponse.json({ error: "Ingresá el nombre y apellido del cliente" }, { status: 400 });
  }
  try {
    const order = await createOrder({
      customer_name: body.customer_name.trim(), customer_phone: body.customer_phone.trim(),
      customer_email: body.customer_email?.trim() || null, equipment: body.equipment.trim(), issue: body.issue.trim(),
      status: body.status, public_note: body.public_note?.trim() || null, internal_note: body.internal_note?.trim() || null,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch { return NextResponse.json({ error: "No se pudo crear la orden" }, { status: 500 }); }
}
