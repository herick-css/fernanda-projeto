"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
};

export default function ScrollReveal({ id, className = "", children }: Props) {
  const reduzirMovimento = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduzirMovimento ? false : { opacity: 0, y: 100 }}
      animate={reduzirMovimento ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: reduzirMovimento ? 0 : 0.6,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.section>
  );
}
