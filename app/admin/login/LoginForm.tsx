"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setLoading(false);
    if (!response.ok) return setError("La clave no es correcta.");
    router.replace("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="admin-login-card"><span className="admin-kicker">TECHPAWS · ÁREA PRIVADA</span><h1>Ingresar al panel</h1><p>Administrá órdenes y mantené informados a tus clientes.</p><label>Clave de administrador<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required autoFocus /></label>{error && <div className="admin-error">{error}</div>}<button disabled={loading}>{loading ? "Ingresando…" : "Ingresar"}</button><a href="/">← Volver a la web</a></form>;
}
