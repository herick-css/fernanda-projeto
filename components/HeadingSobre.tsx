"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const primeiraFrase = "Invista na sua SAÚDE";
const segundaFrase = "INVISTA EM VOCÊ";
const total = primeiraFrase.length + segundaFrase.length;

export default function HeadingSobre() {
  const ref = useRef<HTMLHeadingElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.5 });
  const reduzirMovimento = useReducedMotion();
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    if (!visivel || reduzirMovimento) return;

    let caracteres = 0;
    let timer: ReturnType<typeof setTimeout>;

    function digitar() {
      caracteres += 1;
      setQuantidade(caracteres);

      if (caracteres < total) {
        const pausa = caracteres === primeiraFrase.length ? 300 : 55;

        timer = setTimeout(digitar, pausa);
      }
    }

    // Espera a entrada da seção.
    timer = setTimeout(digitar, 1200);

    return () => clearTimeout(timer);
  }, [visivel, reduzirMovimento]);

  const exibidos = reduzirMovimento ? total : quantidade;
  const terminou = exibidos >= total;

  return (
    <h1
      ref={ref}
      id="titulo-sobre"
      className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
    >
      {/* Leitores de tela recebem o título completo. */}
      <span className="sr-only">
        {primeiraFrase} {segundaFrase}
      </span>

      <span aria-hidden="true" className="relative block text-white">
        {/* Reserva o espaço para evitar mudanças no layout. */}
        <span className="invisible">{primeiraFrase}</span>

        <span className="absolute inset-0">
          {primeiraFrase.slice(0, exibidos)}
        </span>
      </span>

      <span aria-hidden="true" className="relative block text-brand">
        <span className="invisible">{segundaFrase}</span>

        <span className="absolute inset-0">
          {segundaFrase.slice(0, Math.max(0, exibidos - primeiraFrase.length))}
        </span>

        {terminou && !reduzirMovimento && (
          <motion.span
            className="pointer-events-none absolute inset-0 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)",
              backgroundSize: "250% 100%",
              backgroundRepeat: "no-repeat",
            }}
            initial={{
              backgroundPosition: "200% 0%",
              opacity: 0,
            }}
            animate={{
              backgroundPosition: "-100% 0%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: "easeInOut",
              times: [0, 0.15, 0.85, 1],
            }}
          >
            {segundaFrase}
          </motion.span>
        )}
      </span>
    </h1>
  );
}
