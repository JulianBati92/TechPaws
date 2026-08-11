"use client";

import { useEffect, useState } from "react";

const links = [
  ["Servicios", "#servicios"],
  ["Método", "#metodo"],
  ["Nosotros", "#precursores"],
  ["Mi orden", "/seguimiento"],
  ["Contacto", "#contacto"],
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <div className={`cin-mobile-menu ${open ? "is-open" : ""}`}>
    <button className="cin-menu-toggle" type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="menu-movil" onClick={() => setOpen((value) => !value)}>
      <span /><span /><span />
    </button>
    <button className="cin-menu-backdrop" type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} />
    <nav id="menu-movil" aria-label="Navegación móvil">
      <span>MENÚ TECHPAWS</span>
      {links.map(([label, href], index) => <a href={href} key={href} onClick={() => setOpen(false)}><b>0{index + 1}</b>{label}<i>↗</i></a>)}
    </nav>
  </div>;
}
