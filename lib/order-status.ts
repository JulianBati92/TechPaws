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

export const DEFAULT_STATUS_MESSAGES: Record<OrderStatus, string> = {
  received: "Recibimos tu equipo correctamente. En breve comenzaremos el diagnóstico inicial.",
  review: "Tu equipo se encuentra en revisión. Estamos realizando las pruebas necesarias para identificar la falla.",
  approval: "El diagnóstico está listo y estamos esperando tu aprobación para comenzar el trabajo presupuestado.",
  repair: "La reparación fue aprobada y ya estamos trabajando en tu equipo.",
  parts: "La reparación está pausada momentáneamente mientras esperamos la llegada del repuesto necesario.",
  ready: "¡Buenas noticias! Tu equipo está listo. Contactanos para coordinar la entrega o el retiro.",
  delivered: "El equipo fue entregado y la orden quedó finalizada. Gracias por confiar en TechPaws.",
  cancelled: "La orden fue cancelada según lo acordado. Contactanos si necesitás realizar una nueva consulta.",
};

export function statusLabel(value: string) {
  return ORDER_STATUSES.find((status) => status.value === value)?.label ?? value;
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && ORDER_STATUSES.some((status) => status.value === value);
}
