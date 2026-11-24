import { Mail, Phone } from 'lucide-react';

export const EMAIL = 'btbonsa@gmail.com';
export const PHONE_DISPLAY = '+251 908090308';
export const PHONE_TEL = '+251908090308';

export const socials = [
  { href: `mailto:${EMAIL}`, icon: <Mail className="h-[18px] w-[18px]" />, label: 'Email' },
  { href: `tel:${PHONE_TEL}`, icon: <Phone className="h-[18px] w-[18px]" />, label: 'Phone' },
];

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const FORMATS = [
  'Short-Form Reels',
  'TikTok Growth',
  'Hook Scripting',
  'On-Set Direction',
  'Retention Editing',
  'Content Calendars',
  'Brand Storytelling',
  'Community Management',
  'Performance Analytics',
];
