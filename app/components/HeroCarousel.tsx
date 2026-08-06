"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/carousel-reparacion.png", alt: "Todos los precursores de TechPaws reparando una computadora", label: "Reparación experta" },
  { src: "/carousel-remoto.png", alt: "Todos los precursores de TechPaws brindando soporte remoto", label: "Soporte remoto" },
  { src: "/logo-techpaws.png", alt: "Logo oficial de TechPaws con todos sus precursores", label: "Somos TechPaws", logo: true },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const change = (next: number) => setActive((next + slides.length) % slides.length);
  return (
    <div className="carousel-shell" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carrusel" aria-label="TechPaws en acción">
      <div className="carousel-ring ring-one" aria-hidden="true" /><div className="carousel-ring ring-two" aria-hidden="true" />
      <div className="carousel-window">
        {slides.map((slide, index) => <figure className={`carousel-slide ${index === active ? "active" : ""} ${slide.logo ? "logo-slide" : ""}`} key={slide.src} aria-hidden={index !== active}><img src={slide.src} alt={index === active ? slide.alt : ""} /><figcaption>{slide.label}</figcaption></figure>)}
      </div>
      <button className="carousel-arrow previous" type="button" onClick={() => change(active - 1)} aria-label="Imagen anterior">‹</button>
      <button className="carousel-arrow next" type="button" onClick={() => change(active + 1)} aria-label="Imagen siguiente">›</button>
      <div className="carousel-dots" aria-label="Seleccionar imagen">{slides.map((slide, index) => <button type="button" className={index === active ? "active" : ""} onClick={() => change(index)} aria-label={`Mostrar ${slide.label}`} aria-current={index === active ? "true" : undefined} key={slide.src} />)}</div>
    </div>
  );
}
