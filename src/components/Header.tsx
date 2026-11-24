import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useTheme } from 'next-themes';
import { NAV_ITEMS } from '../data/site';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('#home');
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Track scroll depth for floating white pill transition
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 120) setActive('#home');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy active section observer
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ href }) =>
      document.querySelector<HTMLElement>(href),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-32% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll, handle Escape key, and close drawer on desktop resize
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setActive(href);
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
      >
        <div
          className={`flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
            scrolled
              ? 'border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
              : 'border-transparent bg-white dark:bg-zinc-950/80 dark:backdrop-blur-md'
          }`}
        >
          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('#home')}
            className="group flex items-baseline gap-0.5 rounded-lg font-display text-xl font-bold tracking-tight text-slate-900 transition-colors dark:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] focus-visible:ring-offset-2"
            aria-label="Samuel Wake — Back to top"
          >
            SW
            <span className="text-[#f25b3e] transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </button>

          {/* Desktop Navigation (Pill-only active indicator, zero underlines) */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleNavClick(href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] ${
                    isActive
                      ? 'font-semibold text-slate-900 dark:text-zinc-100'
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-slate-200/80 bg-slate-100/80 dark:border-white/15 dark:bg-white/10"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Primary CTA, theme toggle & Mobile Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Toggle color theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#f25b3e] hover:text-[#f25b3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-[#f25b3e]"
            >
              <Sun className="hidden h-4.5 w-4.5 dark:block" aria-hidden />
              <Moon className="h-4.5 w-4.5 dark:hidden" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="group hidden items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f25b3e] hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-[#f25b3e] dark:hover:text-white sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#f25b3e] transition-colors duration-300 group-hover:bg-slate-950" />
              Let&apos;s talk
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-colors hover:border-[#f25b3e] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-8 pb-10 pt-28 dark:bg-zinc-950 md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2" aria-label="Mobile links">
              {NAV_ITEMS.map(({ label, href }, index) => {
                const isActive = active === href;
                return (
                  <motion.button
                    key={href}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{
                      delay: 0.04 * index,
                      duration: 0.35,
                      ease: EASE_OUT_EXPO,
                    }}
                    onClick={() => handleNavClick(href)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display text-3xl font-semibold tracking-tight transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-[#f25b3e] dark:bg-white/10'
                        : 'text-slate-900 hover:bg-slate-50 dark:text-zinc-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      className={`h-6 w-6 transition-all duration-300 ${
                        isActive
                          ? 'text-[#f25b3e] opacity-100'
                          : 'text-zinc-400 opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35, ease: EASE_OUT_EXPO }}
              className="space-y-4"
            >
              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#f25b3e] hover:text-slate-950 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-[#f25b3e] dark:hover:text-white"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="text-center text-xs tracking-wider text-slate-400 dark:text-zinc-500">
                Samuel Wake &bull; Content &amp; Social Media
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}