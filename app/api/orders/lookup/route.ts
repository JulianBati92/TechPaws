import { NextResponse } from "next/server";
import { findOrderToken } from "../../../../lib/orders";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const number = Number(body?.orderNumber);
  const code = String(body?.accessCode || "").trim();
  if (!Number.isInteger(number) || !/^\d{6}$/.test(code)) return NextResponse.json({ error: "Revisá el número y el código" }, { status: 400 });
  try {
    const token = await findOrderToken(number, code);
    return token ? NextResponse.json({ url: `/orden/${token}` }) : NextResponse.json({ error: "No encontramos una orden con esos datos" }, { status: 404 });
  } catch { return NextResponse.json({ error: "No pudimos consultar la orden" }, { status: 500 }); }
}
