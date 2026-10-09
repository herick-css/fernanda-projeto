"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Header() {
  const conteudoRef = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();

  // Informa ao CSS a altura do conteúdo para o parallax.
  useEffect(() => {
    const conteudo = conteudoRef.current;
    if (!conteudo) return;

    const medir = () =>
      conteudo.style.setProperty("--h", `${conteudo.offsetHeight}px`);

    medir();

    const observer = new ResizeObserver(medir);
    observer.observe(conteudo);

    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="header-principal"
      className="video-placeholder relative isolate h-svh w-full bg-black p-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/treinando-blur.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />

        {/* Escurecimento pelo scroll, definido no globals.css. */}
        <div className="header-sombra absolute inset-0 bg-black opacity-0" />
      </div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div
          ref={conteudoRef}
          className="header-conteudo mx-auto w-[calc(100%-3rem)] max-w-xl md:mx-0 md:ml-[8%] md:w-[80%] md:max-w-4xl"
        >
          <motion.div
            className="flex flex-col items-center gap-5 text-center [text-shadow:0_2px_5px_rgba(0,0,0,0.4)] md:items-start md:text-left"
            initial={
              reduzirMovimento
                ? false
                : {
                    opacity: 0,
                    filter: "blur(12px)",
                  }
            }
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: reduzirMovimento ? 0 : 1.2,
              delay: reduzirMovimento ? 0 : 0.3,
              ease: "easeOut",
            }}
          >
            <h1 className="text-center text-[clamp(2.5rem,7vw,8rem)] font-black leading-[0.95] tracking-tight md:text-left">
              <span className="block text-white">FERNANDA</span>

              <span className="mt-2 block text-brand">BEZERRA</span>
            </h1>

            <p className="mt-2 max-w-[28ch] pl-0 text-sm leading-relaxed text-white/50 md:max-w-sm md:pl-2">
              Transformando maus hábitos em qualidade de vida
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
