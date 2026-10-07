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
    if (!nav) return;

    const root = document.documentElement;
    const alturaAnterior = root.style.getPropertyValue("--navbar-height");

    function atualizarAltura() {
      if (!nav) return;

      root.style.setProperty(
        "--navbar-height",
        `${nav.getBoundingClientRect().height}px`,
      );
    }

    const observer = new ResizeObserver(atualizarAltura);

    observer.observe(nav);
    atualizarAltura();

    return () => {
      observer.disconnect();

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
      className="sticky top-0 z-30 border-b border-white/10 bg-[#1013129b]/95 backdrop-blur-md"
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
