import { BarChart3, Clapperboard, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Category = {
  category: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

export const categories: Category[] = [
  {
    category: 'Content Creation',
    description: 'From hook to final cut — scripts, shooting and edits built for the feed.',
    icon: Clapperboard,
    skills: [
      'Short-form video',
      'Hook scripting',
      'Caption writing',
      'Brand storytelling',
      'Visual direction',
    ],
  },
  {
    category: 'Social Media Management',
    description: 'Consistent publishing, community care and a voice your audience recognises.',
    icon: Share2,
    skills: [
      'Content calendars',
      'Community management',
      'Audience engagement',
      'Creator outreach',
      'Brand voice',
    ],
  },
  {
    category: 'Analytics & Growth',
    description: 'Decisions backed by numbers — what to post more of, and what to drop.',
    icon: BarChart3,
    skills: [
      'Performance analytics',
      'Trend research',
      'A/B testing',
      'Paid social',
      'Monthly reporting',
    ],
  },
];

export const tools = [
  'CapCut Pro',
  'Premiere Pro',
  'Canva',
  'Meta Business Suite',
  'TikTok Studio',
  'Buffer',
  'Notion',
];
