import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import HanziWriter from "hanzi-writer";
import { BRAND, loc, tr } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { useCompany, usePageField } from "@/lib/cms-data";

/**
 * HeroWithLoader
 * A self-contained cinematic loader → hero sequence.
 * Phase state machine: "loading" → "transitioning" → "hero".
 * Gradients / SVG only — no external images. Respects prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C2A14D";

type Phase = "loading" | "transitioning" | "hero";

/* ---------- Loader visuals ---------- */

/** Imperfect, hand-drawn ink-wash ring that strokes itself on. */
function InkRing() {
  return (
    <svg viewBox="0 0 200 200" className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
      <motion.path
        d="M100 18 C150 18 184 56 184 100 C184 148 146 184 100 184 C50 184 18 144 18 100 C18 54 54 20 100 18 Z"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
      />
    </svg>
  );
}

/** 良醫中醫 written out one stroke at a time, in stroke order, inside the ring. */
function HanziStrokes({ reduced, onDone }: { reduced: boolean; onDone?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";

    const chars = BRAND.chinese.split("");
    const writers = chars.map((char) => {
      const cell = document.createElement("div");
      host.appendChild(cell);
      return HanziWriter.create(cell, char, {
        width: 86,
        height: 86,
        padding: 2,
        strokeColor: GOLD,
        showCharacter: reduced,
        showOutline: false,
        // Fast strokes so all 47 across the four characters fit the loader window.
        strokeAnimationSpeed: 10,
        delayBetweenStrokes: 0,
      });
    });

    if (reduced) return () => host.replaceChildren();

    // Write character-by-character, left to right; signal when the last finishes.
    let i = 0;
    let cancelled = false;
    const next = () => {
      if (cancelled) return;
      if (i >= writers.length) {
        doneRef.current?.();
        return;
      }
      const w = writers[i];
      i += 1;
      w.animateCharacter({ onComplete: next });
    };
    const t = window.setTimeout(next, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
      host.replaceChildren();
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-label={BRAND.chinese}
      className="relative z-10 flex items-center justify-center -space-x-1"
    />
  );
}

function Loader({ reduced, onDone }: { reduced: boolean; onDone?: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="relative flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px]">
        <InkRing />

        {/* 良醫中醫 drawn stroke-by-stroke inside the ring */}
        <HanziStrokes reduced={reduced} onDone={onDone} />
      </div>

      {/* Progress line */}
      <div className="absolute bottom-16 h-px w-40 overflow-hidden bg-bg/15 sm:w-56">
        <motion.div
          className="h-full"
          style={{ background: GOLD }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0.2 : 2.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */

function Headline({ reduced, text }: { reduced: boolean; text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="display max-w-5xl text-bg text-[clamp(2.8rem,7vw,6rem)]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduced ? { y: 0 } : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.15 + i * 0.09, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
      {/* Gold pulsing period */}
      <motion.span
        className="inline-block"
        style={{ color: GOLD }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.15 + words.length * 0.09 }}
      >
        <motion.span
          className="inline-block"
          animate={reduced ? {} : { opacity: [1, 0.4, 1], scale: [1, 1.18, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          .
        </motion.span>
      </motion.span>
    </h1>
  );
}

function HeroContent({ reduced, active }: { reduced: boolean; active: boolean }) {
  const { lang } = useLang();
  const company = useCompany();
  const badge = usePageField("Home", "Hero badge", loc(`${BRAND.chinese} · ${company.est}`));
  const headline = usePageField("Home", "Hero headline", company.tagline);
  const intro = usePageField("Home", "Hero intro", company.positioning);
  const show = active || reduced;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.7, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-site flex-col justify-end px-6 pb-16 md:pb-24">
      <motion.span {...fade(0.05)} className="mb-6 inline-flex w-fit items-center gap-3 text-bg">
        <span className="h-px w-9" style={{ background: GOLD }} />
        <span className="font-sans text-sm uppercase tracking-[0.24em] text-bg/80">
          {tr(badge, lang)}
        </span>
      </motion.span>

      {show && <Headline reduced={reduced} text={tr(headline, lang)} />}

      <div className="mt-9 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <motion.p {...fade(0.55)} className="max-w-xl text-base font-light leading-relaxed text-bg/85">
          {tr(intro, lang)}
        </motion.p>

        <motion.a
          {...fade(0.68)}
          href="/#contact"
          className="group inline-flex shrink-0 items-center gap-1"
        >
          <span className="rounded-full bg-bg px-7 py-3.5 text-sm tracking-tight text-ink transition-colors duration-500 group-hover:bg-[#C2A14D]">
            {BRAND.cta}
          </span>
          <span className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-bg text-ink transition-colors duration-500 group-hover:bg-[#C2A14D]">
            <ArrowUpRight
              size={20}
              weight="bold"
              className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-12 group-hover:-translate-y-12"
            />
            <ArrowUpRight
              size={20}
              weight="bold"
              className="absolute -translate-x-12 translate-y-12 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fade(0.85)}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bg/55 md:flex"
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.span animate={reduced ? {} : { y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <CaretDown size={18} />
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ---------- Root ---------- */

export default function HeroWithLoader() {
  const reduced = !!useReducedMotion();
  const company = useCompany();
  const [phase, setPhase] = useState<Phase>(reduced ? "hero" : "loading");

  // Advance loading → transitioning (once), triggered when the strokes finish.
  const startTransition = useCallback(() => {
    setPhase((p) => (p === "loading" ? "transitioning" : p));
  }, []);

  // Reduced motion: skip straight to the hero.
  useEffect(() => {
    if (reduced) setPhase("hero");
  }, [reduced]);

  // Safety fallback: if the stroke data fails to load, don't get stuck on the loader.
  useEffect(() => {
    if (reduced) return;
    const fb = window.setTimeout(startTransition, 5000);
    return () => clearTimeout(fb);
  }, [reduced, startTransition]);

  // After the panels split, reveal the hero.
  useEffect(() => {
    if (phase !== "transitioning") return;
    const t = window.setTimeout(() => setPhase("hero"), 950);
    return () => clearTimeout(t);
  }, [phase]);

  const overlayVisible = phase !== "hero";

  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-ink">
      {/* Cinematic background — optional CMS hero image, then gradients, radial mist, noise */}
      <div className="absolute inset-0">
        {company.heroImage && (
          <>
            <img
              src={company.heroImage}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* darken the photo so the cinematic gradients and copy stay legible */}
            <div className="absolute inset-0 bg-ink/70" />
          </>
        )}
        <div className={`absolute inset-0 bg-gradient-to-b from-[#0c1b1a] via-ink to-[#0a1413] ${company.heroImage ? "opacity-60" : ""}`} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 30% 25%, hsl(var(--accent) / 0.18), transparent 60%), radial-gradient(60% 50% at 80% 80%, hsl(var(--accent-deep) / 0.30), transparent 65%)",
          }}
        />
        {/* drifting mist */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(40% 30% at 50% 40%, hsl(var(--accent) / 0.10), transparent 70%)",
          }}
          animate={reduced ? {} : { x: ["-6%", "6%", "-6%"], y: ["-3%", "4%", "-3%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* film-grain noise */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay" aria-hidden>
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
        {/* green shader from the top — matches glow on other pages */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-accent/30 via-accent/8 to-transparent mix-blend-screen" />
      </div>

      {/* Hero content */}
      <HeroContent reduced={reduced} active={phase === "hero"} />

      {/* Loader + split-panel transition overlay */}
      {overlayVisible && (
        <div className="absolute inset-0 z-50">
          {/* Split panels */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-ink"
            initial={{ x: 0 }}
            animate={{ x: phase === "transitioning" ? "-101%" : 0 }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <span className="absolute inset-y-0 right-0 w-px" style={{ background: `${GOLD}55` }} />
          </motion.div>
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-ink"
            initial={{ x: 0 }}
            animate={{ x: phase === "transitioning" ? "101%" : 0 }}
            transition={{ duration: 0.95, ease: EASE }}
          >
            <span className="absolute inset-y-0 left-0 w-px" style={{ background: `${GOLD}55` }} />
          </motion.div>

          {/* Loader content (fades before panels split) */}
          <AnimatePresence>
            {phase === "loading" && <Loader reduced={reduced} onDone={startTransition} />}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
