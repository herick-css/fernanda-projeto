"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function FotoFernanda() {
  const reduzirMovimento = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl">
      <motion.div
        initial={{
          opacity: reduzirMovimento ? 1 : 0,
          x: reduzirMovimento ? 0 : 80,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: reduzirMovimento ? 0 : 0.8,
          duration: reduzirMovimento ? 0 : 0.8,
          ease: "easeOut",
        }}
      >
        <Image
          src="/images/foto-fernanda.png"
          alt="Fernanda Bezerra"
          width={600}
          height={800}
          className="h-auto w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
