import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Play, X } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { useInView } from './hooks/useInView';
import {
  PLATFORMS,
  reels,
  type Platform,
  type PlatformFilter,
  type ReelItem,
} from '../data/projects';

const platformIcon = (p: Platform) =>
  p === 'Instagram' ? <FaInstagram /> : p === 'TikTok' ? <FaTiktok /> : <FaYoutube />;

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?[^ ]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

type TikTokMeta = {
  embed: string | null;
  title?: string;
  author?: string;
  tags: string[];
};

/** Fetch TikTok oEmbed data — resolves short links, returns player URL + title/author/hashtags. */
async function fetchTikTokMeta(url: string): Promise<TikTokMeta | null> {
  try {
    const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    if (!r.ok) return null;
    const data = await r.json();
    const m = data?.html?.match(/player\/v1\/(\d+)/) ?? data?.html?.match(/embed\/v2\/(\d+)/);
    const title: string | undefined = data?.title;
    const tags = title?.match(/#([\w]+)/g)?.map((t: string) => t.slice(1)) ?? [];
    return {
      embed: m ? `https://www.tiktok.com/player/v1/${m[1]}` : null,
      title,
      author: data?.author_name,
      tags,
    };
  } catch {
    return null;
  }
}

function useTikTokMeta(url: string | undefined) {
  const [state, setState] = useState<{
    url?: string;
    meta: TikTokMeta | null;
  }>({ meta: null });

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    fetchTikTokMeta(url).then((meta) => {
      if (!cancelled) setState({ url, meta });
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const current = url && state.url === url ? state.meta : null;
  return { meta: current, loading: Boolean(url) && state.url !== url };
}

/* ------------------------------------------------------------------ */
/* Vertical reel card + lightbox                                       */
/* ------------------------------------------------------------------ */

function ReelCard({
  item,
  index,
  onOpen,
}: {
  item: ReelItem;
  index: number;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(item.src);
  const { meta: tiktokMeta } = useTikTokMeta(
    item.platform === 'TikTok' ? item.url : undefined,
  );

  // Meta fallbacks: anything left empty is filled from TikTok's oEmbed data.
  const cardTitle = item.title || tiktokMeta?.title || 'Untitled';
  const cardClient = item.client || tiktokMeta?.author || '';
  const cardTags = item.tags.length ? item.tags : (tiktokMeta?.tags ?? []);
  const tiktokEmbed = !item.src && !item.poster ? tiktokMeta?.embed : null;

  const ytThumb =
    !item.src && !item.poster && item.platform === 'YouTube' && item.url
      ? youtubeId(item.url)
      : null;

  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={hasVideo ? play : undefined}
      onMouseLeave={hasVideo ? stop : undefined}
      onFocus={hasVideo ? play : undefined}
      onBlur={hasVideo ? stop : undefined}
      onClick={onOpen}
      aria-label={`Open ${cardTitle}`}
      className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-border bg-zinc-950 text-left shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#f25b3e]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] focus-visible:ring-offset-2"
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : item.poster ? (
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : tiktokEmbed ? (
        <iframe
          src={tiktokEmbed}
          title=""
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      ) : ytThumb ? (
        <img
          src={`https://i.ytimg.com/vi/${ytThumb}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f25b3e]/30 via-zinc-800 to-purple-900/40" />
      )}

      {/* Gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

      {/* Platform badge */}
      <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
        {platformIcon(item.platform)}
        {item.platform}
      </span>

      {/* Play icon */}
      <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
        <Play className="h-3 w-3 translate-x-px fill-current" />
      </span>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        {cardClient && (
          <p className="mb-0.5 truncate text-[9px] font-semibold uppercase tracking-widest text-[#ffad9d]">
            {cardClient}
          </p>
        )}
        <h3 className="text-sm font-bold leading-snug text-white sm:text-[15px]">{cardTitle}</h3>
        <p className="mt-1 truncate text-[10px] font-medium text-emerald-300">{item.highlight}</p>
        {cardTags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {cardTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-1.5 py-px text-[9px] font-medium text-white/90 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}

/** Convert a post URL into an embeddable player URL where the platform supports it. */
function embedUrl(item: ReelItem): string | null {
  if (!item.url) return null;
  if (item.platform === 'YouTube') {
    const m = item.url.match(/(?:youtube\.com\/(?:watch\?[^ ]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  }
  if (item.platform === 'TikTok') {
    const m = item.url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    if (m) return `https://www.tiktok.com/embed/v2/${m[1]}`;
  }
  return null;
}

function VideoModal({ item, onClose }: { item: ReelItem; onClose: () => void }) {
  const embed = embedUrl(item);
  const { meta: tiktokMeta, loading: tiktokLoading } = useTikTokMeta(
    item.platform === 'TikTok' ? item.url : undefined,
  );

  const modalTitle = item.title || tiktokMeta?.title || 'Untitled';
  const modalClient = item.client || tiktokMeta?.author || '';
  const modalTags = item.tags.length ? item.tags : (tiktokMeta?.tags ?? []);
  const playerSrc =
    embed ??
    (tiktokMeta?.embed
      ? `${tiktokMeta.embed}?autoplay=1&music_info=1&description=1`
      : null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[calc(100svh-1.5rem)] w-full max-w-3xl flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-zinc-950 text-white shadow-2xl md:flex-row md:overflow-hidden"
      >
        <div className="relative aspect-[9/16] max-h-[48svh] w-full shrink-0 bg-black md:max-h-[calc(100svh-1.5rem)] md:w-[42%]">
          {playerSrc ? (
            <iframe
              src={playerSrc}
              title={modalTitle}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : item.src ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          ) : item.url && item.platform === 'TikTok' && tiktokLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          ) : item.url ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f25b3e]/20 via-zinc-900 to-purple-900/30 p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                <Play className="h-6 w-6 translate-x-0.5 fill-current" />
              </span>
              <p className="text-sm text-zinc-300">
                This {item.platform} post can't be embedded here.
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#f25b3e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff7a5c]"
              >
                Watch on {item.platform}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : item.poster ? (
            <img src={item.poster} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#f25b3e]/30 via-zinc-800 to-purple-900/40" />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#ffad9d]">
                {platformIcon(item.platform)}
                {item.platform}
              </span>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-[#f25b3e]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalClient && (
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {modalClient}
              </p>
            )}
            <h3 className="mt-1 text-xl font-bold leading-snug">{modalTitle}</h3>
            {item.highlight && (
              <p className="mt-2 text-xs font-semibold text-emerald-400">{item.highlight}</p>
            )}
            {item.concept && (
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.concept}</p>
            )}
          </div>

          {modalTags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
              {modalTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  const { ref, inView } = useInView();
  const [platform, setPlatform] = useState<PlatformFilter>('All');
  const [active, setActive] = useState<ReelItem | null>(null);

  const filteredReels = reels.filter(
    (item) => platform === 'All' || item.platform === platform,
  );

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.06] blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#f25b3e]/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f25b3e]">
            My work
          </p>
          <h2 className="font-display mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Samples of Work
          </h2>
          <div className="section-divider" />
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground sm:text-base">
            Explore selected short-form concepts and social channels. Select a card to see the campaign details.
          </p>
        </motion.div>

        {/* Platform filter — clean segmented control */}
        <div className="mb-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-10">
          <div
            role="group"
            aria-label="Filter by platform"
            className="mx-auto flex w-max min-w-full items-center gap-0.5 rounded-full border border-border bg-white/80 p-1 shadow-sm backdrop-blur-sm dark:bg-zinc-900/80 sm:min-w-0"
          >
            {PLATFORMS.map((p) => {
              const selected = platform === p;
              const count = p === 'All' ? reels.length : reels.filter((item) => item.platform === p).length;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPlatform(p);
                    setActive(null);
                  }}
                  aria-pressed={selected}
                  aria-label={`Show ${count} ${p === 'All' ? 'project' : p + ' project'}${count === 1 ? '' : 's'}`}
                  className={`relative inline-flex min-h-7 shrink-0 snap-start items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f25b3e] focus-visible:ring-offset-2 sm:px-3.5 sm:text-xs ${
                    selected
                      ? 'text-white dark:text-zinc-900'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="work-platform-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1">
                    {p !== 'All' && platformIcon(p)}
                    {p === 'All' ? 'All' : p}
                    <span className={`rounded-full px-1 py-px text-[9px] leading-none ${selected ? 'bg-white/15 text-white dark:bg-black/10 dark:text-zinc-900' : 'bg-foreground/[0.06] text-muted-foreground'}`} aria-hidden>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current work (vertical reels) */}
        <div>
          <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-foreground sm:text-xl">
            <span className="h-px w-8 bg-[#f25b3e]" />
            Currently Managing
            <span className="relative ml-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </h3>
          <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredReels.map((item, i) => (
                <ReelCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={() => setActive(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active && <VideoModal item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}