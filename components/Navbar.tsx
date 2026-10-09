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

    let alturaNav = 0;

    function medir() {
      if (!nav || !header) return;

      alturaNav = nav.getBoundingClientRect().height;

      root.style.setProperty("--navbar-height", `${alturaNav}px`);

      // distância de scroll em que o fundo da navbar termina de aparecer
      root.style.setProperty(
        "--navbar-fim",
        `${Math.max(1, header.offsetHeight - alturaNav)}px`,
      );
    }

    const observer = new ResizeObserver(medir);

    observer.observe(nav);
    observer.observe(header);

    medir();

    return () => {
      observer.disconnect();

      if (alturaAnterior) {
        root.style.setProperty("--navbar-height", alturaAnterior);
      } else {
        root.style.removeProperty("--navbar-height");
      }
      root.style.removeProperty("--navbar-fim");
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Navegação principal"
      className="navbar-fundo fixed inset-x-0 top-0 z-30"
    >
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-6 sm:gap-x-8">
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
