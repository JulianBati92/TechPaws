"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/carousel-reparacion.png", alt: "Todos los precursores de TechPaws reparando una computadora", label: "Reparación experta" },
  { src: "/carousel-remoto.png", alt: "Todos los precursores de TechPaws brindando soporte remoto", label: "Soporte remoto" },
  { src: "/carousel-identidad.png", alt: "Los cinco precursores que representan la identidad de TechPaws", label: "Somos TechPaws" },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="carousel-shell" aria-roledescription="carrusel" aria-label="TechPaws en acción" aria-live="polite">
      <div className="carousel-ring ring-one" aria-hidden="true" /><div className="carousel-ring ring-two" aria-hidden="true" />
      <div className="carousel-window">
        {slides.map((slide, index) => <figure className={`carousel-slide ${index === active ? "active" : ""}`} key={slide.src} aria-hidden={index !== active}><img src={slide.src} alt={index === active ? slide.alt : ""} /><figcaption>{slide.label}</figcaption></figure>)}
      </div>
    </div>
  );
}
