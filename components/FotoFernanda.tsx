"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

// Recortes com fundo transparente, nomeados como as fotos de fotos-fernanda-stock.
// Todas no mesmo enquadramento (858x1400) para a Fernanda não "pular" de tamanho.
const fotos = [
  { src: "/images/fernanda/IMG_5722.webp", alt: "Fernanda Bezerra de braços cruzados" },
  { src: "/images/fernanda/IMG_5715.webp", alt: "Fernanda Bezerra segurando uma fita métrica" },
  { src: "/images/fernanda/IMG_5709.webp", alt: "Fernanda Bezerra com a camisa escura do uniforme" },
  { src: "/images/fernanda/IMG_5718.webp", alt: "Fernanda Bezerra sorrindo enquanto olha o celular" },
  { src: "/images/fernanda/IMG_5713.webp", alt: "Fernanda Bezerra sentada, com os braços sobre o joelho" },
];

const INTERVALO_MS = 4000;

export default function FotoFernanda() {
  const areaRef = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();
  const [atual, setAtual] = useState(0);

  // Troca a foto a cada 4s; para quando a aba fica oculta.
  useEffect(() => {
    if (reduzirMovimento) return;

    let id: ReturnType<typeof setInterval> | undefined;
    const iniciar = () => {
      clearInterval(id);
      id = setInterval(
        () => setAtual((i) => (i + 1) % fotos.length),
        INTERVALO_MS,
      );
    };
    const aoMudarVisibilidade = () =>
      document.hidden ? clearInterval(id) : iniciar();

    iniciar();
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, [reduzirMovimento]);

  const inclinacaoX = useMotionValue(0);
  const inclinacaoY = useMotionValue(0);

  const rotateX = useSpring(inclinacaoX, {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(inclinacaoY, {
    stiffness: 150,
    damping: 20,
  });

  function mover(event: PointerEvent<HTMLDivElement>) {
    if (reduzirMovimento || event.pointerType !== "mouse") return;

    const area = areaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();

    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
    );

    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
    );

    inclinacaoX.set(-y * 8);
    inclinacaoY.set(x * 8);
  }

  function resetar() {
    inclinacaoX.set(0);
    inclinacaoY.set(0);
  }

  return (
    <div
      ref={areaRef}
      onPointerMove={mover}
      onPointerLeave={resetar}
      onPointerCancel={resetar}
      className="w-full translate-y-[3%]"
    >
      {/* Entrada da foto. */}
      <motion.div
        initial={
          reduzirMovimento
            ? false
            : {
                opacity: 0,
                x: 80,
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: reduzirMovimento ? 0 : 0.8,
          duration: reduzirMovimento ? 0 : 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
        >
          {/* A largura máxima garante que a foto inteira caiba na altura da tela. */}
          <div
            className="relative mx-auto aspect-858/1400 w-full"
            style={{
              maxWidth:
                "min(100%, calc((100dvh - var(--navbar-height, 0px) - 6rem) * 0.613))",
            }}
          >
            {fotos.map((foto, i) => {
              const ativa = i === atual;
              return (
                <motion.div
                  key={foto.src}
                  aria-hidden={!ativa}
                  className="absolute inset-0"
                  initial={false}
                  animate={
                    ativa
                      ? { opacity: 1, x: [20, 0], filter: ["blur(4px)", "blur(0px)"] }
                      : { opacity: 0, x: -20, filter: "blur(4px)" }
                  }
                  // a nova só entra depois da anterior sair: sem "dupla exposição"
                  transition={{
                    duration: 0.45,
                    delay: ativa ? 0.35 : 0,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain object-bottom"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
