export type Platform = 'Instagram' | 'TikTok' | 'YouTube';

export type ReelItem = {
  id: string;
  title: string;
  platform: Platform;
  client: string;
  concept: string;
  highlight: string;
  /** Direct video file — local path (/videos/x.mp4) or a full https://…mp4 URL */
  src?: string;
  /** Optional link to the original post (TikTok / Instagram / YouTube) */
  url?: string;
  poster?: string;
  tags: string[];
};

// TikTok posts auto-fill title/client/tags from the video's metadata —
// leave those fields as '' (or tags: []) to use the fetched values.
// Duplicate a block below and change `id` + `url` to add more reels.
export const reels: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Promotional Content',
    platform: 'TikTok',
    client: '',
    concept:
      'We’re excited to collaborate with Kanu to promote the business, create awareness, attract customers, and help the business grow. Stay tuned for exciting activities, fun interviews, interactive challenges, and special giveaways! 🎤🎁',
    highlight: '112.3k followers',
    url: 'https://vt.tiktok.com/ZSsYVg3tx/',
    tags: [],
  },
  {
    id: 'reel-2',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://vt.tiktok.com/ZSsYqSNrB',
    tags: [],
  },
  {
    id: 'reel-3',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://vt.tiktok.com/ZSsYskjm2/',
    tags: [],
  },
];

export type PlatformFilter = 'All' | Platform;
export const PLATFORMS: PlatformFilter[] = ['All', 'Instagram', 'TikTok', 'YouTube'];
