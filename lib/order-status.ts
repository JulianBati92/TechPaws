export const ORDER_STATUSES = [
  { value: "received", label: "Equipo recibido" },
  { value: "review", label: "En revisión" },
  { value: "approval", label: "Esperando aprobación" },
  { value: "repair", label: "Reparación en curso" },
  { value: "parts", label: "Esperando repuesto" },
  { value: "ready", label: "Listo para retirar" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number]["value"];

export function statusLabel(value: string) {
  return ORDER_STATUSES.find((status) => status.value === value)?.label ?? value;
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && ORDER_STATUSES.some((status) => status.value === value);
}
