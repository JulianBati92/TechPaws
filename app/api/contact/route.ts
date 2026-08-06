import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] || char);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (clean(data.website, 100)) return NextResponse.json({ ok: true });
    const nombre = clean(data.nombre, 80);
    const email = clean(data.email, 120);
    const telefono = clean(data.telefono, 30);
    const servicio = clean(data.servicio, 120);
    const descripcion = clean(data.descripcion, 2000);

    if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !telefono || !servicio || descripcion.length < 10) {
      return NextResponse.json({ error: "Revisá los datos ingresados e intentá nuevamente." }, { status: 400 });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_EMAIL || user;
    if (!user || !pass || !to) {
      console.error("Faltan variables SMTP.");
      return NextResponse.json({ error: "El formulario no está configurado. Contactanos por WhatsApp." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
    await transporter.sendMail({
      from: `TechPaws Web <${user}>`, to, replyTo: email, subject: `Nueva consulta: ${servicio}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nServicio: ${servicio}\n\n${descripcion}`,
      html: `<h2>Nueva consulta desde TechPaws</h2><p><b>Nombre:</b> ${escapeHtml(nombre)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Teléfono:</b> ${escapeHtml(telefono)}</p><p><b>Servicio:</b> ${escapeHtml(servicio)}</p><p><b>Descripción:</b></p><p>${escapeHtml(descripcion).replace(/\n/g, "<br>")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar consulta:", error);
    return NextResponse.json({ error: "No pudimos enviar la consulta. Escribinos por WhatsApp." }, { status: 500 });
  }
}
