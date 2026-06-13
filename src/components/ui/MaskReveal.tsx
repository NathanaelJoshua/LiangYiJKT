import { motion, type Variants } from "framer-motion";
import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaskRevealProps {
  /** Each string renders as its own clip-masked line. */
  lines: ReactNode[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  lineClassName?: string;
  delay?: number;
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.09,
    },
  }),
};

/**
 * Line-by-line headline reveal: each line slides up from behind an
 * overflow-clip mask. Animates transform only.
 */
export default function MaskReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
}: MaskRevealProps) {
  return createElement(
    as,
    { className },
    <motion.span
      className="block"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            custom={i + delay}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
