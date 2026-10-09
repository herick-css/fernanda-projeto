"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"section">;

export default function ScrollReveal({
  children,
  className = "",
  ...props
}: Props) {
  const reduzirMovimento = useReducedMotion();

  return (
    <section {...props} className={className}>
      <motion.div
        className="w-full"
        initial={
          reduzirMovimento
            ? false
            : { opacity: 0, y: 80 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true, amount: 0.25 }}
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
