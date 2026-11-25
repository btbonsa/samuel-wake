import { Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ContactInfo = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
};

export const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'samuelwakeswsw@gmail.com', href: 'mailto:btbonsa@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+251 908090308', href: 'tel:+251908090308' },
  { icon: MapPin, label: 'Location', value: 'Holeta, Ethiopia', href: '#' },
];
