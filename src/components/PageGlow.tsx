/** Soft teal/green gradient wash from the top of a page (matches the Locations page). */
export default function PageGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[110vh] bg-gradient-to-b from-accent/35 via-accent/10 to-transparent"
    />
  );
}
