"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackingForm() {
  const [mode, setMode] = useState<"order" | "name">("order");
  const [orderNumber, setOrderNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const body = mode === "order" ? { orderNumber, accessCode } : { customerName, phoneLast4 };
    const response = await fetch("/api/orders/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setError(data.error);
    router.push(data.url);
  }

  return <form className="tracking-form" onSubmit={submit}>
    <div className="tracking-tabs" role="tablist" aria-label="Forma de consulta">
      <button type="button" className={mode === "order" ? "active" : ""} onClick={() => { setMode("order"); setError(""); }}>Tengo mi número</button>
      <button type="button" className={mode === "name" ? "active" : ""} onClick={() => { setMode("name"); setError(""); }}>Olvidé mi número</button>
    </div>
    {mode === "order" ? <>
      <label>Número de orden<input inputMode="numeric" placeholder="Ej. 1001" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value.replace(/\D/g, ""))} required /></label>
      <label>Código de acceso<input inputMode="numeric" maxLength={6} placeholder="6 dígitos" value={accessCode} onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, ""))} required /></label>
    </> : <>
      <p className="tracking-help">Escribí el mismo nombre registrado al entregar el equipo.</p>
      <label>Nombre y apellido<input autoComplete="name" placeholder="Ej. Juan Pérez" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required /></label>
      <label>Últimos 4 dígitos de tu WhatsApp<input inputMode="numeric" maxLength={4} placeholder="Ej. 1431" value={phoneLast4} onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, ""))} required /></label>
    </>}
    {error && <div className="tracking-error">{error}</div>}
    <button className="tracking-submit" disabled={loading}>{loading ? "Consultando…" : "Ver estado de mi equipo"}</button>
  </form>;
}
