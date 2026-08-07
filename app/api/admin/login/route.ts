import { NextResponse } from "next/server";
import { createAdminSession } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Clave incorrecta" }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
