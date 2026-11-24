import { motion, MotionConfig } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FORMAT_ICON, SERVICES, TILE_GRADIENTS, TILES } from "../data/about";

/** A feed-style grid. The middle column is dropped slightly, like a staggered profile grid. */
function FeedGrid() {
  return (
    <div className="relative">
      {/* Gold corner accents */}
      <span aria-hidden className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-[#f25b3e]/50" />
      <span aria-hidden className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-[#f25b3e]/50" />

      <ul className="grid grid-cols-3 gap-2 pb-6 sm:gap-3">
        {TILES.map((tile, i) => {
          const Icon = FORMAT_ICON[tile.format];
          return (
            <li
              key={i}
              className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${
                TILE_GRADIENTS[i % TILE_GRADIENTS.length]
              } ${i % 3 === 1 ? "translate-y-6" : ""}`}
            >
              {tile.src && (
                <img
                  src={tile.src}
                  alt={tile.alt ?? ""}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">{tile.format}</span>
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/0 transition-all duration-300 group-hover:text-white/90">
                {tile.format}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        {/* Faint gold wash behind the section */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#f25b3e]/[0.07] blur-[120px]"
        />

        {/* One reveal for the whole section, not one per element */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto grid max-w-4xl items-start gap-12 sm:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:gap-16"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f25b3e]"
            >
              <span className="h-px w-8 bg-[#f25b3e]/60" aria-hidden />
              About me
            </motion.p>

            <h2 className="font-display max-w-xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              I handle the full creative cycle,{" "}
              <span className="italic text-[#f25b3e]">from first idea</span> to
              published post.
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
              <p>
                I'm a content creator and social media manager. I turn ideas into
                content people stop for, and brands into communities. I take care
                of concept, scripting, shooting, editing and publishing, with a
                focus on storytelling that connects and converts.
              </p>
              <p>
                I plan content calendars, grow engaged audiences, and track what
                works so every post has a purpose. When I'm not creating, I'm
                studying trends, testing new formats, and learning what makes
                people stop, watch, and share.
              </p>
            </div>

            {/* Services as interactive cards */}
            <ul className="mt-12 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {SERVICES.map(({ icon: Icon, title, description }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="group glass-card relative flex flex-col gap-4 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/70 transition-colors duration-300 group-hover:bg-[#f25b3e]/15 group-hover:text-[#f25b3e]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f25b3e]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <FeedGrid />
            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
              A snapshot of the work
            </p>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
