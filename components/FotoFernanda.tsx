"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

export default function FotoFernanda() {
  const areaRef = useRef<HTMLDivElement>(null);
  const reduzirMovimento = useReducedMotion();

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
      className="w-full perspective:1000px"
    >
      {/* Entrada da foto. */}
      <motion.div
        initial={
          reduzirMovimento
            ? false
            : {
                opacity: 0,
                x: 80,
                filter: "blur(10px)",
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
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
          <Image
            src="/images/foto-fernanda-dois.png"
            alt="Fernanda Bezerra"
            width={600}
            height={800}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
