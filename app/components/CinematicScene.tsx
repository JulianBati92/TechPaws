"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; vx: number; vy: number; r: number; phase: number };

export default function CinematicScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 950);
    const canvas = canvasRef.current;
    if (!canvas) return () => window.clearTimeout(timer);
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return () => window.clearTimeout(timer);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let pointerX = 0.65;
    let pointerY = 0.42;
    let points: Point[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(34, Math.min(88, Math.floor(width / 18)));
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: index % 9 === 0 ? 2.1 : 1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const move = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(width, 1);
      pointerY = event.clientY / Math.max(height, 1);
      document.documentElement.style.setProperty("--cin-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cin-y", `${event.clientY}px`);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(pointerX * width, pointerY * height, 0, pointerX * width, pointerY * height, Math.max(width, height) * 0.5);
      glow.addColorStop(0, "rgba(22,103,255,.12)");
      glow.addColorStop(1, "rgba(3,7,13,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        if (!reduced) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;
          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;
        }
        const pulse = 0.65 + Math.sin(time * 0.001 + point.phase) * 0.3;
        context.beginPath();
        context.fillStyle = index % 9 === 0 ? `rgba(55,137,255,${pulse})` : `rgba(164,198,255,${pulse * 0.42})`;
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fill();

        for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
          const other = points[otherIndex];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 145) {
            context.beginPath();
            context.strokeStyle = `rgba(65,142,255,${(1 - distance / 145) * 0.24})`;
            context.lineWidth = 0.7;
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    if (!reduced) frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const chapters = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.12 });
    const chapterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.documentElement.dataset.chapter = (entry.target as HTMLElement).dataset.chapter || "00";
    }), { threshold: 0.48 });
    elements.forEach((element) => revealObserver.observe(element));
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--cin-progress", `${max > 0 ? window.scrollY / max : 0}`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { revealObserver.disconnect(); chapterObserver.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  return <>
    <div className={`cin-preloader ${loaded ? "is-done" : ""}`} aria-hidden="true"><div className="cin-pre-mark"><span className="cin-paw"><i /><i /><i /><i /><b /></span></div><p>TECHPAWS · INICIANDO SISTEMA</p><div className="cin-pre-track"><i /></div><small>DIAGNÓSTICO DIGITAL</small></div>
    <canvas ref={canvasRef} className="cin-canvas" aria-hidden="true" />
    <div className="cin-tech-grid" aria-hidden="true" />
    <div className="cin-vignette" aria-hidden="true" />
    <div className="cin-progress" aria-hidden="true"><i /></div>
  </>;
}
