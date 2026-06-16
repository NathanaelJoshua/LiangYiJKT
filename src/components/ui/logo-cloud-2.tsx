import type { Partner } from "@/lib/content";
import { cn } from "@/lib/utils";

// Accent (--accent: 24 34% 46%) as hex — every logo renders in this single tone.
const TONE = "9d6d4d";

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Partner[];
};

/**
 * Single-tone logo grid. Real brand marks are pulled from the Simple Icons CDN
 * and recoloured to the brand accent, so the whole wall reads as one tone.
 */
export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {logos.map((logo) => (
        <div
          key={logo.slug}
          className="group flex items-center justify-center bg-surface px-6 py-6 transition-colors duration-300 hover:bg-bg md:py-12"
        >
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}/${TONE}`}
            alt={logo.name}
            loading="lazy"
            className="h-12 w-auto select-none object-contain opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 md:h-7"
          />
        </div>
      ))}
    </div>
  );
}
