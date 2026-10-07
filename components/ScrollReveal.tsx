"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
};

export default function ScrollReveal({
  id,
  className = "",
  children,
  "aria-labelledby": labelledBy,
}: Props) {
  const reduzirMovimento = useReducedMotion();

  return (
    <section id={id} className={className} aria-labelledby={labelledBy}>
      <motion.div
        className="w-full"
        initial={reduzirMovimento ? false : { opacity: 0, y: 120 }}
        animate={
          reduzirMovimento ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: false,
          amount: 0.25,
        }}
        transition={{
          duration: reduzirMovimento ? 0 : 1.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
