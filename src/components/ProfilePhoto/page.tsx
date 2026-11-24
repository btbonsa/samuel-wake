import type { PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Send } from 'lucide-react';
import profileImage from '../../assets/sami.png'; // transparent PNG (background removed)

type ProfilePhotoProps = {
  src?: string;
  alt?: string;
  status?: string;
  replyHref?: string;
  className?: string;
};

/**
 * The portrait is framed like a social story: progress bars on top,
 * and a "reply" pill at the bottom that is the real contact link.
 */
export function ProfilePhoto({
  src = profileImage,
  alt = 'Portrait of Samuel Wake',
  status = 'Open to collabs',
  replyHref = '#contact',
  className = '',
}: ProfilePhotoProps) {
  const reduceMotion = useReducedMotion();

  // Subtle 3D tilt for mouse users only (skipped on touch and reduced motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px] ${className}`}
    >
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative aspect-[9/14] w-full"
      >
        {/* Story frame */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f25b3e] via-[#b8743f] to-[#7c3a5a] shadow-2xl shadow-black/30 ring-1 ring-white/25"
        >
          <div className="absolute left-1/2 top-[14%] h-[56%] w-[88%] -translate-x-1/2 rounded-full border border-white/25" />
        </div>

        {/* Story progress bars (sit behind the subject's head on purpose) */}
        <div aria-hidden className="absolute inset-x-5 top-5 flex gap-1.5">
          <span className="h-[3px] flex-1 rounded-full bg-white/90" />
          <span className="h-[3px] flex-1 rounded-full bg-white/90" />
          <span className="h-[3px] flex-1 rounded-full bg-white/35" />
        </div>

        {/* Cut-out subject rises past the top edge of the frame */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="absolute bottom-0 left-1/2 z-10 h-[106%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
        />

        {/* Reply pill: status + contact link in one */}
        <a
          href={replyHref}
          className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2 rounded-full border border-white/40 bg-black/30 py-2 pl-3 pr-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/45 sm:inset-x-4 sm:bottom-4 sm:pl-4 sm:pr-2 sm:text-sm"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            {status}
          </span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#7c3a5a] sm:h-8 sm:w-8">
            <Send className="h-4 w-4" aria-hidden />
            <span className="sr-only">Send a message</span>
          </span>
        </a>
      </motion.div>
    </div>
  );
}