"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No pudimos enviar la consulta.");
      form.reset(); setStatus("success"); setMessage("¡Consulta enviada! Te responderemos a la brevedad.");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "No pudimos enviar la consulta. Escribinos por WhatsApp.");
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-head"><div><span>CONSULTA ONLINE</span><h3>Solicitá tu diagnóstico</h3></div><b>01</b></div>
    <p className="contact-form-intro">Completá estos datos y te respondemos para coordinar la revisión de tu equipo.</p>
    <label className="website-field" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {message && <p className={`form-status ${status}`} role="status">{message}</p>}
    <div className="field-row"><label>Nombre y apellido<input name="nombre" required maxLength={80} placeholder="Tu nombre completo" autoComplete="name" /></label><label>Email<input type="email" name="email" required maxLength={120} placeholder="tu@email.com" autoComplete="email" /></label></div>
    <div className="field-row"><label>Teléfono<input type="tel" name="telefono" required maxLength={30} placeholder="11 1234 5678" autoComplete="tel" /></label><label>Tipo de servicio<select name="servicio" required defaultValue=""><option value="" disabled>Seleccionar servicio</option><option>Reparación de PC o notebook</option><option>Optimización y mantenimiento</option><option>Instalación de Windows y programas</option><option>Eliminación de virus</option><option>Actualización de componentes</option><option>Recuperación y respaldo de datos</option><option>Otro</option></select></label></div>
    <label>Descripción breve<textarea name="descripcion" required minLength={10} maxLength={2000} rows={4} placeholder="Contanos qué problema tiene tu equipo..." /></label>
    <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Enviar consulta"}<span>↗</span></button>
    <p className="form-note">Tus datos se utilizan únicamente para responder esta consulta.</p>
  </form>;
}
