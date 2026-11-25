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
  /** 'current' = actively managed client work, 'past' = previous experience */
  status: 'current' | 'past';
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
    url: 'https://www.tiktok.com/@calii33777/video/7709033066768960776?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-2',
    title: 'Promotional Content',
    platform: 'TikTok',
    client: '',
    concept:
      'We’re excited to collaborate with Kanu to promote the business, create awareness, attract customers, and help the business grow. Stay tuned for exciting activities, fun interviews, interactive challenges, and special giveaways! 🎤🎁',
    highlight: '112.3k followers',
    url: 'https://www.tiktok.com/@calii33777/video/7706182392679107858?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-3',
    title: 'Promotional Content',
    platform: 'TikTok',
    client: '',
    concept:
      'We’re excited to collaborate with Kanu to promote the business, create awareness, attract customers, and help the business grow. Stay tuned for exciting activities, fun interviews, interactive challenges, and special giveaways! 🎤🎁',
    highlight: '112.3k followers',
    url: 'https://www.tiktok.com/@calii33777/video/7691701795239972103?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-4',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://vt.tiktok.com/ZSsYqSNrB',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-5',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://www.tiktok.com/@elanet/video/7689116739388345618?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-6',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://www.tiktok.com/@elanet/video/7679096929174785288?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-7',
    title: 'Funny Content/Interview',
    platform: 'TikTok',
    client: 'elanet',
    concept:
      'Ask tricky and funny interview questions, challenge everyone to think carefully, and reward the participants who get the correct answers with exciting giveaways! 🎁😂',
    highlight: '1.2k followers',
    url: 'https://vt.tiktok.com/ZSsYskjm2/',
    tags: [],
    status: 'current',
  },
  {
    id: 'reel-8',
    title: 'Promotional contents',
    platform: 'TikTok',
    client: 'UDAY FRESH JUICE',
    concept:
      'Create engaging promotional content for UDAY FRESH JUICE, including a complete video script, attention-grabbing hooks, compelling marketing messages, and a strong call to action.',
    highlight: '183 followers',
    url: 'https://www.tiktok.com/@uday.fresh.juice/video/7666110272695946503?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'past',
  },
  {
    id: 'reel-9',
    title: 'Promotional contents',
    platform: 'TikTok',
    client: 'UDAY FRESH JUICE',
    concept:
      'Create engaging promotional content for UDAY FRESH JUICE, including a complete video script, attention-grabbing hooks, compelling marketing messages, and a strong call to action.',
    highlight: '183 followers',
    url: 'https://www.tiktok.com/@uday.fresh.juice/video/7666480546448444690?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'past',
  },
  {
    id: 'reel-10',
    title: 'Promotional contents',
    platform: 'TikTok',
    client: 'UDAY FRESH JUICE',
    concept:
      'Create engaging promotional content for UDAY FRESH JUICE, including a complete video script, attention-grabbing hooks, compelling marketing messages, and a strong call to action.',
    highlight: '183 followers',
    url: 'https://www.tiktok.com/@uday.fresh.juice/video/7667223563123969288?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'past',
  },
    {
    id: 'reel-11',
    title: 'Promotional contents',
    platform: 'TikTok',
    client: 'TECNO MOBILE HOLETA',
    concept:
      'Create engaging promotional content for TECNO MOBILE HOLETA, including a complete video script, attention-grabbing hooks, compelling marketing messages, and a strong call to action.',
    highlight: '1.7k followers',
    url: '\https://www.tiktok.com/@tecnomobilehole81/video/7663898930270309652?is_from_webapp=1&sender_device=pc&web_id=7694643338901620276',
    tags: [],
    status: 'past',
  },
];

export type PlatformFilter = 'All' | Platform;
export const PLATFORMS: PlatformFilter[] = ['All', 'Instagram', 'TikTok', 'YouTube'];
