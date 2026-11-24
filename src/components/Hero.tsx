import { motion, MotionConfig } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import resumePdf from "../assets/Bonsa resume.pdf";
import { ProfilePhoto } from "./ProfilePhoto/page";
import { FORMATS, socials as SOCIALS } from "../data/site";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/** Availability pill with a live pulse dot. */
function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/75 py-1 pl-2 pr-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur-md dark:bg-white/5 sm:mb-7"
    >
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400/40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      Booking Brand Retainers &amp; Campaigns
    </motion.div>
  );
}

/** Giant outline name bleeding off the edges — pure background texture. */
function BackgroundName() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="font-display -translate-y-[16vh] whitespace-nowrap text-center text-[30vw] font-black leading-[0.85] tracking-tight select-none sm:-translate-y-[15vh] sm:text-[25vw] lg:-translate-y-[14vh] lg:text-[19vw]">
        <span className="text-outline block">Samuel</span>
        <span className="text-outline-gold block italic">Wake</span>
      </div>
    </motion.div>
  );
}

/** Ambient ticker of Samuel's core deliverables. */
function FormatTicker() {
  const items = [...FORMATS, ...FORMATS];
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-border/80 bg-background/40 py-3.5 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 48, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-7 pr-7 text-sm font-medium uppercase tracking-[0.16em] text-foreground/60 sm:text-base"
          >
            {item}
            <span className="h-1.5 w-1.5 rotate-45 bg-[#f25b3e]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative flex min-h-[680px] sm:min-h-[760px] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-28"
      >
        <BackgroundName />

        {/* Ambient warm gold glow behind the portrait */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f25b3e]/[0.12] blur-[130px]"
        />

        {/* Subtle radial dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
          <AvailabilityBadge />

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease: REVEAL_EASE }}
            className="w-full max-w-[190px] sm:max-w-[265px]"
          >
            <ProfilePhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-7 sm:mt-9"
          >
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#f25b3e]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Samuel Wake
            </p>

            <h1 className="font-display mt-2 text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              <span className="block">Social media</span>
              <span className="block italic text-[#f25b3e]">
                with a pulse.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Content strategy, sharp short-form video and community management for brands ready to show up with purpose.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171718] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#f25b3e]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f25b3e]/30"
              >
                View Selected Work
              </a>
              <a
                href={resumePdf}
                download="Samuel Wake CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f25b3e]/60 hover:text-foreground"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <ul className="flex items-center gap-2">
                {SOCIALS.map(({ href, icon, label }) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="glass-card flex rounded-full border border-border/80 p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-[#f25b3e]/50 hover:text-[#f25b3e]"
                      >
                        {icon}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>

        <FormatTicker />
      </section>
    </MotionConfig>
  );
}