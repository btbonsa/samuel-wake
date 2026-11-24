import { NAV_ITEMS, socials } from '../data/site';

const FOOTER_LINKS = NAV_ITEMS.filter(({ href }) => href !== '#home');

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <a
          href="#home"
          className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-[#f25b3e]"
        >
          Samuel Wake<span className="text-[#f25b3e]">.</span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          {socials.map(({ href, icon, label }) => {
            const isExternal = href.startsWith('http');
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="glass-card flex rounded-full p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-[#f25b3e]/40 hover:text-[#f25b3e]"
              >
                {icon}
              </a>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground/70">
          © {currentYear} Samuel Wake. Content creator &amp; social media manager.
        </p>
      </div>
    </footer>
  );
}
