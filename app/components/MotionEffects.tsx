"use client";
import { useEffect } from "react";
export default function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const elements = document.querySelectorAll(".section-head, .service-card, .benefit-intro, .benefit-grid > div, .about-card, .contact-info, .contact-form");
    elements.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    const move = (event: PointerEvent) => {
      root.style.setProperty("--mouse-x", `${event.clientX}px`);
      root.style.setProperty("--mouse-y", `${event.clientY}px`);
      root.style.setProperty("--tilt-x", `${(event.clientX / window.innerWidth - .5) * 16}px`);
      root.style.setProperty("--tilt-y", `${(event.clientY / window.innerHeight - .5) * 10}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("pointermove", move); };
  }, []);
  return null;
}
