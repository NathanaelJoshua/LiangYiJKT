import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import type { Partner } from "@/lib/content";

// Accent (--accent: 170 76% 61%) as hex — every logo renders in this single tone.
const TONE = "52e7ce";

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Partner[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={56} reverse duration={40} durationOnHover={90}>
        {logos.map((logo) => (
          <img
            key={`logo-${logo.slug}`}
            alt={logo.name}
            src={`https://cdn.simpleicons.org/${logo.slug}/${TONE}`}
            loading="lazy"
            className="pointer-events-none h-9 w-auto select-none object-contain opacity-80 md:h-12"
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
