import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.16em] text-[0.7rem] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-12 px-6",
};

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:bg-accent",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-accent",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", as = "button", href, children, ...props }, ref) => {
    const classes = cn(base, sizes[size], variants[variant], className);
    if (as === "a") {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
