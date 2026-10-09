"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "#sobre-mim", label: "Sobre mim" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#horarios", label: "Agendar horário" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const header = document.getElementById("header-principal");

    if (!nav || !header) return;

    const root = document.documentElement;
    const alturaAnterior = root.style.getPropertyValue("--navbar-height");

    let frame: number | null = null;
    let alturaNav = 0;

    function atualizarFundo() {
      if (!nav || !header) return;

      const { top, height } = header.getBoundingClientRect();

      const progresso = Math.min(
        1,
        Math.max(0, -top / Math.max(1, height - alturaNav)),
      );

      // #101312: verde bem escuro.
      nav.style.backgroundColor = `rgba(21, 67, 52, ${progresso * (96 / 255)})`;

      nav.style.backdropFilter = `blur(${progresso * 12}px)`;

      nav.style.borderBottomColor = `rgba(255, 255, 255, ${progresso * 0.1})`;
    }

    function agendarAtualizacao() {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        atualizarFundo();
      });
    }

    function medir() {
      if (!nav) return;

      alturaNav = nav.getBoundingClientRect().height;

      root.style.setProperty("--navbar-height", `${alturaNav}px`);

      agendarAtualizacao();
    }

    const observer = new ResizeObserver(medir);

    observer.observe(nav);
    observer.observe(header);

    medir();
    atualizarFundo();

    window.addEventListener("scroll", agendarAtualizacao, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", agendarAtualizacao);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      if (alturaAnterior) {
        root.style.setProperty("--navbar-height", alturaAnterior);
      } else {
        root.style.removeProperty("--navbar-height");
      }
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-transparent backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-[1.5rem] sm:gap-x-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`rounded-md px-1 py-2 text-sm font-semibold transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
              link.href === "#horarios" ? "text-brand" : "text-white/80"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
