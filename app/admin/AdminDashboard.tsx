"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_STATUS_MESSAGES, ORDER_STATUSES, statusLabel } from "../../lib/order-status";
import type { Order } from "../../lib/orders";

const empty = {
  customer_name: "", customer_phone: "", customer_email: "", equipment: "", issue: "",
  status: "received", public_note: DEFAULT_STATUS_MESSAGES.received, internal_note: "",
};

const date = (value: string) => new Intl.DateTimeFormat("es-AR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [draft, setDraft] = useState(empty);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function load() {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    if (response.status === 401) return router.replace("/admin/login");
    const data = await response.json();
    setOrders(data.orders || []);
    if (!response.ok) setMessage(data.error);
  }

  useEffect(() => { void load(); }, []);

  const visible = useMemo(() => orders.filter((order) =>
    `${order.order_number} ${order.customer_name} ${order.equipment}`.toLowerCase().includes(filter.toLowerCase())
  ), [orders, filter]);

  async function create(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const response = await fetch("/api/admin/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) return setMessage(data.error);
    setDraft(empty);
    setMessage(`Orden #${data.order.order_number} creada correctamente.`);
    await load();
  }

  async function save(order: Order) {
    setBusy(true);
    const response = await fetch(`/api/admin/orders/${order.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
    const data = await response.json();
    setBusy(false);
    setMessage(response.ok ? `Orden #${order.order_number} actualizada.` : data.error);
    if (response.ok) await load();
  }

  async function remove(order: Order) {
    const confirmed = window.confirm(`¿Eliminar definitivamente la orden #${order.order_number} de ${order.customer_name}?\n\nTambién se borrará todo su historial. Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    setBusy(true);
    const response = await fetch(`/api/admin/orders/${order.id}`, { method: "DELETE" });
    const data = await response.json();
    setBusy(false);
    setMessage(response.ok ? `La orden #${order.order_number} fue eliminada.` : data.error);
    if (response.ok) await load();
  }

  function edit(id: number, patch: Partial<Order>) {
    setOrders((current) => current.map((order) => {
      if (order.id !== id) return order;
      const next = { ...order, ...patch };
      if (patch.status) next.public_note = DEFAULT_STATUS_MESSAGES[patch.status];
      return next;
    }));
  }

  function changeDraftStatus(status: Order["status"]) {
    setDraft({ ...draft, status, public_note: DEFAULT_STATUS_MESSAGES[status] });
  }

  function whatsApp(order: Order) {
    const trackingUrl = `${window.location.origin}/seguimiento`;
    const text = `Hola ${order.customer_name}, ¿cómo estás?\n\nTe escribimos de *TechPaws* para informarte una novedad sobre tu equipo.\n\n*Orden:* #${order.order_number}\n*Estado actual:* ${statusLabel(order.status)}\n\n${order.public_note || DEFAULT_STATUS_MESSAGES[order.status]}\n\nPodés consultar el seguimiento cuando quieras en:\n${trackingUrl}\n\n*Número de orden:* ${order.order_number}\n*Código de acceso:* ${order.access_code}\n\nAnte cualquier consulta, estamos a disposición.\n*TechPaws · Servicio técnico*`;
    window.open(`https://wa.me/${order.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login"); router.refresh();
  }

  return <main className="admin-shell">
    <header className="admin-header"><div><span>TECH<span>PAWS</span></span><small>ÓRDENES DE SERVICIO</small></div><div><a href="/seguimiento" target="_blank">Ver consulta pública ↗</a><button onClick={logout}>Salir</button></div></header>
    <section className="admin-intro"><div><p className="admin-kicker">PANEL PRIVADO</p><h1>Seguimiento claro,<br />clientes tranquilos.</h1></div><div className="admin-stats"><div><strong>{orders.length}</strong><span>Órdenes</span></div><div><strong>{orders.filter((o) => o.status === "ready").length}</strong><span>Listas</span></div><div><strong>{orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length}</strong><span>Activas</span></div></div></section>
    {message && <div className="admin-message">{message}</div>}
    <section className="admin-grid">
      <form className="order-create" onSubmit={create}>
        <p className="admin-kicker">NUEVA ORDEN</p><h2>Registrar equipo</h2>
        <div className="form-two"><label>Nombre y apellido *<input required placeholder="Ej. Juan Pérez" autoComplete="name" value={draft.customer_name} onChange={(e) => setDraft({ ...draft, customer_name: e.target.value })} /></label><label>WhatsApp *<input required placeholder="+54 11..." value={draft.customer_phone} onChange={(e) => setDraft({ ...draft, customer_phone: e.target.value })} /></label></div>
        <label>Email<input type="email" value={draft.customer_email} onChange={(e) => setDraft({ ...draft, customer_email: e.target.value })} /></label>
        <label>Equipo *<input required placeholder="Ej. Notebook Lenovo IdeaPad" value={draft.equipment} onChange={(e) => setDraft({ ...draft, equipment: e.target.value })} /></label>
        <label>Problema informado *<textarea required rows={3} value={draft.issue} onChange={(e) => setDraft({ ...draft, issue: e.target.value })} /></label>
        <label>Estado<select value={draft.status} onChange={(e) => changeDraftStatus(e.target.value as Order["status"])}>{ORDER_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label>
        <label>Mensaje visible para el cliente<textarea rows={3} value={draft.public_note} onChange={(e) => setDraft({ ...draft, public_note: e.target.value })} /></label>
        <label>Nota interna<textarea rows={2} value={draft.internal_note} onChange={(e) => setDraft({ ...draft, internal_note: e.target.value })} /></label>
        <button className="admin-primary" disabled={busy}>Crear orden</button>
      </form>
      <div className="orders">
        <div className="orders-title"><div><p className="admin-kicker">ÓRDENES</p><h2>Trabajos registrados</h2></div><input aria-label="Buscar órdenes" placeholder="Buscar cliente, número o equipo" value={filter} onChange={(e) => setFilter(e.target.value)} /></div>
        <div className="order-list">{visible.map((order) => <article className="order-card" key={order.id}>
          <div className="order-top"><div><span className="order-number">#{order.order_number}</span><h3>{order.customer_name}</h3><p>{order.equipment} · {date(order.updated_at)}</p></div><span className={`status status-${order.status}`}>{statusLabel(order.status)}</span></div>
          <p className="order-issue">{order.issue}</p>
          <div className="order-edit"><label>Estado<select value={order.status} onChange={(e) => edit(order.id, { status: e.target.value as Order["status"] })}>{ORDER_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label><label>Mensaje para el cliente<textarea rows={2} value={order.public_note || ""} onChange={(e) => edit(order.id, { public_note: e.target.value })} /></label><label>Nota interna<textarea rows={2} value={order.internal_note || ""} onChange={(e) => edit(order.id, { internal_note: e.target.value })} /></label></div>
          <div className="order-meta"><span>Código: <strong>{order.access_code}</strong></span><a href={`/orden/${order.public_token}`} target="_blank">Ver seguimiento ↗</a></div>
          <div className="order-actions"><button className="delete-order" onClick={() => remove(order)} disabled={busy}>Borrar orden</button><button onClick={() => save(order)} disabled={busy}>Guardar cambios</button><button className="wa-button" onClick={() => whatsApp(order)}>Avisar por WhatsApp</button></div>
        </article>)}{!visible.length && <div className="empty-orders">Todavía no hay órdenes para mostrar.</div>}</div>
      </div>
    </section>
  </main>;
}
