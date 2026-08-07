import { NextResponse } from "next/server";
import { isAdmin } from "../../../../../lib/admin-auth";
import { deleteOrder, updateOrder } from "../../../../../lib/orders";
import { isOrderStatus } from "../../../../../lib/order-status";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const id = Number((await params).id);
  const body = await request.json().catch(() => null);
  if (!Number.isInteger(id) || !body || !isOrderStatus(body.status)) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  try {
    const order = await updateOrder(id, { status: body.status, public_note: body.public_note?.trim() || null, internal_note: body.internal_note?.trim() || null });
    return order ? NextResponse.json({ order }) : NextResponse.json({ error: "Orden inexistente" }, { status: 404 });
  } catch { return NextResponse.json({ error: "No se pudo actualizar" }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Orden inválida" }, { status: 400 });
  try {
    return await deleteOrder(id) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Orden inexistente" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar la orden" }, { status: 500 });
  }
}
