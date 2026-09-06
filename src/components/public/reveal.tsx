"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Entrance animation dipakai di seluruh section public — sengaja
 * memakai kurva & timing yang sama dengan HeroSection agar motion
 * terasa satu bahasa, bukan tiap section punya gaya animasi sendiri.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      variants={fadeUp}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
