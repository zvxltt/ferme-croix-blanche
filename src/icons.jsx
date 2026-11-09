// Icônes du site (traits, couleur héritée du texte)

const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

function Svg({ size = 24, sw = 1.8, vb = '0 0 24 24', children, ...props }) {
  return (
    <svg width={size} height={size} viewBox={vb} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <g {...base} strokeWidth={sw}>{children}</g>
    </svg>
  )
}

// Icône de viande
export function BeefIcon({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3" />
        <path d="m18.5 6l2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" />
        <circle cx="12.5" cy="8.5" r="2.5" />
      </g>
    </svg>
  )
}

export const Arrow = (p) => (
  <svg className="ar" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...p}><path d="M2 8h12M9 3l5 5-5 5" /></svg>
)
export const Check = (p) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...p}><path d="M4 10l4 4 8-8" /></svg>
)
export const Plus = (p) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...p}><path d="M8 3v10M3 8h10" /></svg>
)
export const Search = (p) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...p}><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" /></svg>
)

export const HomeIcon = (p) => <Svg sw={1.7} {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></Svg>
export const TagIcon = (p) => <Svg sw={1.7} {...p}><path d="M20 12l-8 8-9-9V3h8z" /><circle cx="7.5" cy="7.5" r="1.5" /></Svg>
export const ChatIcon = (p) => <Svg sw={1.7} {...p}><path d="M4 5h16v12H8l-4 3z" /></Svg>
export const BagIcon = (p) => <Svg sw={1.7} {...p}><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Svg>
export const PhoneIcon = (p) => <Svg sw={1.7} {...p}><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z" /></Svg>

// Icônes du carrousel
const SheepIcon = (p) => <Svg {...p}><circle cx="8" cy="8" r="3" /><circle cx="13" cy="6.5" r="3" /><circle cx="17" cy="10" r="3" /><circle cx="6" cy="12.5" r="3" /><path d="M9 12h7l-1 6c-.5 2-2 3-2.5 3S10.5 20 10 18z" /></Svg>
const PigIcon = (p) => <Svg {...p}><ellipse cx="12" cy="13" rx="8" ry="7" /><ellipse cx="12" cy="15" rx="3" ry="2" /><path d="M6 8L4.5 4l4 1.5M18 8l1.5-4-4 1.5" /></Svg>
const CalfIcon = (p) => <Svg {...p}><path d="M7 8h10l-1 7c-.5 3-2.5 4.5-4 4.5S8.5 18 8 15z" /><path d="M7 8C4.5 7.5 4 5.5 4.5 4.5c1.5 0 2.5 1 3 2M17 8c2.5-.5 3-2.5 2.5-3.5-1.5 0-2.5 1-3 2" /></Svg>
const KnifeIcon = (p) => <Svg {...p}><path d="M4 20L16 8l2 2L8 20z" /><path d="M16 8l3-3a2 2 0 0 1 2 2l-3 3" /></Svg>
const BarnIcon = (p) => <Svg {...p}><path d="M3 10l9-6 9 6v10H3z" /><path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6" /></Svg>
const LeafIcon = (p) => <Svg {...p}><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l8-8" /></Svg>
const HorseIcon = (p) => <Svg {...p}><path d="M6 21v-6l-2-3 3-6 3-2 1-2 1 3 5 3 3 3-2 2-3-2-1 4 1 6" /></Svg>

export const CAROUSEL_ICONS = {
  beef: BeefIcon, sheep: SheepIcon, pig: PigIcon, calf: CalfIcon,
  knife: KnifeIcon, barn: BarnIcon, leaf: LeafIcon, horse: HorseIcon,
}
