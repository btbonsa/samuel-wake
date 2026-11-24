import { motion, MotionConfig } from 'motion/react';
import { useInView } from './hooks/useInView';
import { categories, tools } from '../data/skills';

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Skills() {
  const { ref, inView } = useInView();

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="skills"
        className="relative scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 text-center sm:mb-16"
          >
            <p className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f25b3e]">
              <span className="h-px w-8 bg-[#f25b3e]/60" aria-hidden />
              What I do
              <span className="h-px w-8 bg-[#f25b3e]/60" aria-hidden />
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Skills &amp; expertise
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              End-to-end social media execution — from the first idea to the
              monthly report.
            </p>
          </motion.div>

          {/* Three clean capability cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.article
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group glass-card flex min-w-0 flex-col rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f25b3e]/40"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/70 transition-colors duration-300 group-hover:bg-[#f25b3e]/15 group-hover:text-[#f25b3e]">
                  <cat.icon className="h-5 w-5" aria-hidden />
                </span>

                <h3 className="text-lg font-bold text-foreground">{cat.category}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-border/60 pt-5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-foreground/75"
                    >
                      <span className="h-1 w-1 shrink-0 rotate-45 bg-[#f25b3e]" aria-hidden />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          {/* Tools — simple static row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center sm:mt-16"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
              Tools I work with
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-border bg-foreground/[0.03] px-4 py-2 text-sm font-medium text-foreground/75 transition-colors duration-200 hover:border-[#f25b3e]/40 hover:text-foreground"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
