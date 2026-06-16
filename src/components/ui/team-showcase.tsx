import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

/**
 * Staggered photo grid with a synced name list (adapted from team-showcase for
 * this project's design tokens). Hovering a photo or a name highlights both;
 * the rest dim. Photos are grayscale until active.
 */
export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex w-full select-none flex-col items-start gap-8 md:flex-row md:gap-10 lg:gap-14">
      {/* Photo grid */}
      <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((m) => (
            <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId}
              className="h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]" />
          ))}
        </div>
        <div className="mt-[48px] flex flex-col gap-2 sm:mt-[56px] md:mt-[68px] md:gap-3">
          {col2.map((m) => (
            <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId}
              className="h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]" />
          ))}
        </div>
        <div className="mt-[22px] flex flex-col gap-2 sm:mt-[26px] md:mt-[32px] md:gap-3">
          {col3.map((m) => (
            <PhotoCard key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId}
              className="h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]" />
          ))}
        </div>
      </div>

      {/* Name list */}
      <div className="flex w-full flex-1 flex-col gap-4 pt-0 sm:grid sm:grid-cols-2 md:flex md:flex-col md:gap-5 md:pt-2">
        {members.map((m) => (
          <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="h-full w-full object-cover transition-[filter] duration-500"
        style={{ filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.82)" }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn("cursor-pointer transition-opacity duration-300", isDimmed ? "opacity-50" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "h-3 flex-shrink-0 rounded-[5px] transition-all duration-300",
            isActive ? "w-5 bg-accent" : "w-4 bg-ink/25"
          )}
        />
        <span
          className={cn(
            "font-display text-lg font-medium leading-none tracking-tight transition-colors duration-300 md:text-xl",
            isActive ? "text-ink" : "text-ink/80"
          )}
        >
          {member.name}
        </span>
      </div>
      <p className="mt-1.5 pl-[30px] font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {member.role}
      </p>
    </div>
  );
}
