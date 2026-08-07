import { NextResponse } from "next/server";
import { findOrderToken, findOrderTokenByCustomer } from "../../../../lib/orders";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const number = Number(body?.orderNumber);
  const code = String(body?.accessCode || "").trim();
  const customerName = String(body?.customerName || "").trim().replace(/\s+/g, " ");
  const phoneLast4 = String(body?.phoneLast4 || "").replace(/\D/g, "");
  const byOrder = Number.isInteger(number) && number > 0 && /^\d{6}$/.test(code);
  const byCustomer = customerName.length >= 5 && /^\d{4}$/.test(phoneLast4);
  if (!byOrder && !byCustomer) return NextResponse.json({ error: "Completá una de las dos opciones de consulta" }, { status: 400 });
  try {
    const token = byOrder ? await findOrderToken(number, code) : await findOrderTokenByCustomer(customerName, phoneLast4);
    return token ? NextResponse.json({ url: `/orden/${token}` }) : NextResponse.json({ error: "No encontramos una orden con esos datos" }, { status: 404 });
  } catch { return NextResponse.json({ error: "No pudimos consultar la orden" }, { status: 500 }); }
}
