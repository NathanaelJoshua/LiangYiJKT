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
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
};

/**
 * Line-by-line headline reveal: each line settles up with a soft fade.
 * Calm and restrained — animates transform/opacity only.
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
        <span key={i} className="block">
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
