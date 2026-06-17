import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
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
  "inline-flex items-center justify-center gap-2 font-sans text-sm tracking-tight rounded-full transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
};

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:bg-accent",
  outline: "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-accent-deep rounded-none px-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", as = "button", href, children, ...props }, ref) => {
    const classes = cn(base, sizes[size], variants[variant], className);
    if (as === "a") {
      return (
        <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
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
