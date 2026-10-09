"use client";

import { useEffect, useRef } from "react";

const luzes = [
  { left: "0%", top: "1%", size: 500, duration: 8, delay: -4 },
  { left: "65%", top: "8%", size: 320, duration: 10, delay: -9 },
  { left: "45%", top: "60%", size: 320, duration: 11, delay: -6 },
  { left: "80%", top: "78%", size: 260, duration: 12, delay: -12 },
  { left: "1%", top: "80%", size: 460, duration: 9, delay: -4 },
];

export default function BokehBackground() {
  const fundoRef = useRef<HTMLDivElement>(null);
  const luzRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fundo = fundoRef.current;
    const luz = luzRef.current;

    if (!fundo || !luz || !fundo.parentElement) return;

    const section = fundo.parentElement;

    // pausa as animações quando a seção não está visível
    const visibilidade = new IntersectionObserver(([entrada]) => {
      fundo.dataset.pausado = entrada.isIntersecting ? "false" : "true";
    });
    visibilidade.observe(fundo);

    const permitido = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (!permitido.matches) return () => visibilidade.disconnect();

    let frame: number | null = null;
    let x = 0;
    let y = 0;
    // mede uma vez (e quando a área muda) em vez de a cada movimento do mouse
    let rect = fundo.getBoundingClientRect();
    let sujo = false;
    const invalidar = () => {
      sujo = true;
    };
    const ro = new ResizeObserver(invalidar);
    ro.observe(fundo);
    window.addEventListener("scroll", invalidar, { passive: true });

    function mover(event: PointerEvent) {
      if (!fundo || !luz) return;

      if (sujo) {
        rect = fundo.getBoundingClientRect();
        sujo = false;
      }

      x = event.clientX - rect.left;
      y = event.clientY - rect.top;

      luz.style.opacity = "0.2";

      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;

        luz.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });
    }

    function esconder() {
      if (!luz) return;
      luz.style.opacity = "0";
    }

    section.addEventListener("pointermove", mover);
    section.addEventListener("pointerleave", esconder);

    return () => {
      ro.disconnect();
      visibilidade.disconnect();
      window.removeEventListener("scroll", invalidar);
      section.removeEventListener("pointermove", mover);
      section.removeEventListener("pointerleave", esconder);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={fundoRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {luzes.map((luz, index) => (
        <span
          key={index}
          className="bokeh-light"
          style={{
            left: luz.left,
            top: luz.top,
            width: luz.size,
            height: luz.size,
            animationDuration: `${luz.duration}s`,
            animationDelay: `${luz.delay}s`,
          }}
        />
      ))}

      <span ref={luzRef} className="bokeh-mouse" />
    </div>
  );
}
