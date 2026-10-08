"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const conteudoRef = useRef<HTMLDivElement>(null);
  const sombraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !conteudoRef.current || !sombraRef.current) {
      return;
    }

    const header = headerRef.current;
    const conteudo = conteudoRef.current;
    const sombra = sombraRef.current;

    let frame: number | null = null;
    let visivel = true;
    let medidasDesatualizadas = true;

    let alturaHeader = 0;
    let alturaTotalHeader = 0;
    let alturaConteudo = 0;
    let alturaJanela = 0;
    let bordaTopo = 0;
    let paddingTopo = 0;
    let paddingFim = 0;

    function medir() {
      const estilo = getComputedStyle(header);

      alturaHeader = header.clientHeight;
      alturaTotalHeader = header.getBoundingClientRect().height;
      alturaConteudo = conteudo.offsetHeight;
      alturaJanela = window.innerHeight;
      bordaTopo = header.clientTop;

      paddingTopo = parseFloat(estilo.paddingTop) || 0;
      paddingFim = parseFloat(estilo.paddingBottom) || 0;

      medidasDesatualizadas = false;
    }

    function atualizar() {
      if (!visivel) return;

      if (medidasDesatualizadas) {
        medir();
      }

      const { top } = header.getBoundingClientRect();
      const origem = top + bordaTopo;

      const inicio = Math.max(paddingTopo, -origem);

      const fim = Math.min(alturaHeader - paddingFim, alturaJanela - origem);

      const posicaoCentral = (inicio + fim - alturaConteudo) / 2;

      const limiteInferior = Math.max(
        paddingTopo,
        alturaHeader - paddingFim - alturaConteudo,
      );

      const posicao = Math.min(
        limiteInferior,
        Math.max(paddingTopo, posicaoCentral),
      );

      const progressoBlur = Math.min(
        1,
        Math.max(
          0,
          (posicaoCentral - limiteInferior) / Math.max(1, alturaConteudo / 2),
        ),
      );

      conteudo.style.filter = `blur(${progressoBlur * 12}px)`;

      const progresso = Math.min(
        1,
        Math.max(0, -top / Math.max(1, alturaTotalHeader)),
      );

      conteudo.style.transform = `translateY(${posicao}px)`;
      sombra.style.opacity = String(Math.min(0.9, progresso * 1.8));
    }

    function agendarAtualizacao() {
      if (!visivel || frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        frame = null;
        atualizar();
      });
    }

    function aoRedimensionar() {
      medidasDesatualizadas = true;
      agendarAtualizacao();
    }

    const resizeObserver = new ResizeObserver(aoRedimensionar);

    resizeObserver.observe(header);
    resizeObserver.observe(conteudo);

    const intersectionObserver = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;

        if (visivel) {
          medidasDesatualizadas = true;
          agendarAtualizacao();
        } else if (frame !== null) {
          window.cancelAnimationFrame(frame);
          frame = null;
        }
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(header);

    conteudo.style.top = "0px";
    atualizar();

    window.addEventListener("scroll", agendarAtualizacao, {
      passive: true,
    });

    window.addEventListener("resize", aoRedimensionar);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      window.removeEventListener("scroll", agendarAtualizacao);

      window.removeEventListener("resize", aoRedimensionar);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative isolate flex h-[100vh] w-full items-center justify-center bg-black p-6 video-placeholder"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover blur-xs"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="../videos/treinando-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <div
          ref={sombraRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
      </div>

      <div
        ref={conteudoRef}
        className="absolute inset-x-6 top-0 z-20 mx-auto max-w-xl transition-none will-change-transform"
      >
        <div className="flex flex-col items-center gap-5 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
          <h2 className="fontsize">
            FERNANDA
            <br />
            BEZERRA
          </h2>

          <p className="text-xs tracking-[0.18em] text-white/60 sm:text-sm">
            Transformando maus hábitos em qualidade de vida
          </p>
        </div>
      </div>
    </header>
  );
}
