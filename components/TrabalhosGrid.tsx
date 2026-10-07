"use client";

import { motion, useReducedMotion } from "motion/react";

type Trabalho = {
  numero: string;
  titulo: string;
  texto: string;
};

export default function TrabalhosGrid({
  trabalhos,
}: {
  trabalhos: Trabalho[];
}) {
  const reduzirMovimento = useReducedMotion();

  return (
    <motion.div
      className="mt-10 grid gap-5 md:grid-cols-3"
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        oculto: { opacity: reduzirMovimento ? 1 : 0 },
        visivel: {
          opacity: 1,
          transition: {
            duration: reduzirMovimento ? 0 : 0.3,
            delayChildren: reduzirMovimento ? 0 : 0.8,
            staggerChildren: reduzirMovimento ? 0 : 0.8,
          },
        },
      }}
    >
      {trabalhos.map((item) => (
        <motion.article
          key={item.numero}
          className="rounded-2xl border border-black/10 bg-white p-7"
          variants={{
            oculto: {
              opacity: reduzirMovimento ? 1 : 0,
              y: reduzirMovimento ? 0 : 30,
            },
            visivel: {
              opacity: 1,
              y: 0,
              transition: {
                duration: reduzirMovimento ? 0 : 0.5,
                ease: "easeOut",
              },
            },
          }}
          whileHover={reduzirMovimento ? undefined : { y: -4 }}
        >
          <span className="text-sm font-bold text-emerald-700">
            {item.numero}
          </span>

          <h3 className="mt-6 text-xl font-bold">{item.titulo}</h3>

          <p className="mt-3 leading-relaxed text-slate-600">{item.texto}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
