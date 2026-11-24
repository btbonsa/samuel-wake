import {
  Camera,
  Clapperboard,
  Layers,
  CalendarDays,
  Play,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Tile = {
  format: "Reel" | "Carousel" | "Photo";
  src?: string;
  alt?: string;
};

// Demo placeholders — swap `src`/`alt` for real posts when ready.
export const TILES: Tile[] = [
  {
    format: "Reel",
    src: "https://picsum.photos/seed/reel-one/640/800",
    alt: "Demo reel still",
  },
  {
    format: "Carousel",
    src: "https://picsum.photos/seed/carousel-one/640/800",
    alt: "Demo carousel cover",
  },
  {
    format: "Reel",
    src: "https://picsum.photos/seed/reel-two/640/800",
    alt: "Demo reel still",
  },
  {
    format: "Photo",
    src: "https://picsum.photos/seed/photo-one/640/800",
    alt: "Demo photo post",
  },
  {
    format: "Reel",
    src: "https://picsum.photos/seed/reel-three/640/800",
    alt: "Demo reel still",
  },
  {
    format: "Carousel",
    src: "https://picsum.photos/seed/carousel-two/640/800",
    alt: "Demo carousel cover",
  },
];

export const FORMAT_ICON: Record<Tile["format"], LucideIcon> = {
  Reel: Play,
  Carousel: Layers,
  Photo: Camera,
};

export const TILE_GRADIENTS = [
  "from-[#f25b3e] to-[#7c3a5a]",
  "from-[#7c3a5a] to-[#2b1a2e]",
  "from-[#b8743f] to-[#f25b3e]",
  "from-[#2b1a2e] to-[#b8743f]",
  "from-[#f25b3e] to-[#b8743f]",
  "from-[#7c3a5a] to-[#f25b3e]",
];

export const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clapperboard,
    title: "Content creation",
    description:
      "Reels, posts and stories, from concept and script to shooting and editing.",
  },
  {
    icon: CalendarDays,
    title: "Social media management",
    description:
      "Content calendars, consistent posting and daily engagement with your community.",
  },
  {
    icon: TrendingUp,
    title: "Audience growth",
    description:
      "Strategy built on analytics and trends, with new formats tested along the way.",
  },
];
