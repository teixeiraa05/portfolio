import {
  ChevronLeft,
  ChevronRight,
  CodeXml,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Moon,
  Plus,
  Snowflake,
  Sun,
  X,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

const icons: Partial<Record<string, LucideIcon>> = {
  moon: Moon,
  sun: Sun,
  snowflake: Snowflake,
  pin: MapPin,
  mail: Mail,
  globe: Globe,
  close: X,
  'external-link': ExternalLink,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  plus: Plus,
}

const originalArtwork: Partial<Record<string, ReactNode>> = {
  github: (
    <path d="M9 20c-4 1-4-2-6-2m12 4v-3.8c0-1-.4-1.7-.8-2.1 2.8-.3 5.8-1.4 5.8-6.2 0-1.4-.5-2.5-1.3-3.4.1-.4.6-1.7-.2-3.3 0 0-1.1-.4-3.6 1.3a12 12 0 0 0-6 0C6.4 2.8 5.3 3.2 5.3 3.2c-.8 1.6-.3 2.9-.2 3.3a5 5 0 0 0-1.3 3.4c0 4.8 3 5.9 5.8 6.2-.4.4-.8 1.2-.8 2.1V22" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5v6.3m4-6.3v6.3m0-3.8a2.5 2.5 0 0 1 5 0v3.8" />
      <circle cx="7.5" cy="7.3" r=".65" fill="currentColor" />
    </>
  ),
  elio: (
    <>
      <path d="m13 14 7-7V3h-4l-7 7m-3 0 8 8M3 21l6-6m-6 2 4 4" />
    </>
  ),
  flow: (
    <>
      <path d="m7 7 10 3M7 17l10-5M5 8v7" />
      <circle cx="5" cy="5" r="2.7" />
      <circle cx="5" cy="18" r="2.7" />
      <circle cx="19" cy="11" r="2.7" />
    </>
  ),
  color: (
    <>
      <path d="m12 4 7 14H5L12 4Z" />
      <circle cx="12" cy="4" r="3" fill="#f2bc61" />
      <circle cx="19" cy="18" r="3" fill="#7da5db" />
      <circle cx="5" cy="18" r="3" fill="#c4a4dc" />
    </>
  ),
  pulse: <path d="M2 12h5l3-8 4 16 3-8h5" />,
  sushi: (
    <>
      <path d="M3 9v6c0 5 18 5 18 0V9" />
      <ellipse cx="12" cy="9" rx="9" ry="5" />
      <ellipse cx="12" cy="9" rx="3.4" ry="1.7" fill="currentColor" />
    </>
  ),
  serial: (
    <>
      <path d="M3 7h18l-2.2 10H5.2L3 7Z" />
      <path strokeDasharray="1 3" d="M7 10h11m-9 4h7" />
    </>
  ),
}

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const artwork = originalArtwork[name]
  if (artwork) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {artwork}
      </svg>
    )
  }

  const Glyph = icons[name] ?? CodeXml
  return <Glyph size={size} strokeWidth={1.65} aria-hidden="true" />
}
