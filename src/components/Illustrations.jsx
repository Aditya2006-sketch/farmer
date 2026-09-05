// Original, hand-built flat-illustration artwork — no external images or stock photography.
// A consistent warm, rounded illustration language (turbaned farmer, wheat sheaves, rolling
// fields) is reused across the hero, empty states, success screens and tip cards so the whole
// product feels like one considered visual system rather than a stock-photo gallery.
import React from 'react'

/** Large hero illustration: farmer standing in a field holding a wheat sheaf at golden hour. */
export function FarmerHeroIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 360" className={className} role="img" aria-label="Illustration of a farmer standing in a green field holding harvested wheat">
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDF3D9" />
          <stop offset="100%" stopColor="#F3E5B3" />
        </linearGradient>
        <linearGradient id="heroField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CA766" />
          <stop offset="100%" stopColor="#2F7B3A" />
        </linearGradient>
        <linearGradient id="heroFieldFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78BC7F" />
          <stop offset="100%" stopColor="#4C9A57" />
        </linearGradient>
      </defs>

      <rect width="520" height="360" fill="url(#heroSky)" />
      <circle cx="430" cy="70" r="46" fill="#F6C453" opacity="0.9" />
      <circle cx="430" cy="70" r="66" fill="#F6C453" opacity="0.18" />

      {/* rolling hills */}
      <path d="M0 200 Q 130 160 260 195 T 520 190 V360 H0 Z" fill="url(#heroFieldFar)" />
      <path d="M0 240 Q 150 195 300 235 T 520 225 V360 H0 Z" fill="url(#heroField)" />

      {/* small trees */}
      <g opacity="0.9">
        <circle cx="70" cy="215" r="20" fill="#3C8A46" />
        <rect x="66" y="228" width="8" height="18" fill="#6B4A2E" />
        <circle cx="470" cy="205" r="16" fill="#3C8A46" />
        <rect x="466" y="216" width="6" height="14" fill="#6B4A2E" />
      </g>

      {/* farmer figure */}
      <g transform="translate(210,120)">
        {/* shadow */}
        <ellipse cx="60" cy="216" rx="58" ry="10" fill="#1F4E29" opacity="0.18" />

        {/* legs */}
        <rect x="34" y="150" width="18" height="62" rx="8" fill="#F4EFE3" />
        <rect x="66" y="150" width="18" height="62" rx="8" fill="#EDE6D2" />
        <rect x="30" y="206" width="26" height="12" rx="5" fill="#8A5A2B" />
        <rect x="62" y="206" width="26" height="12" rx="5" fill="#734A22" />

        {/* dhoti/kurta body */}
        <path d="M22 90 Q60 70 98 90 L108 160 Q60 178 12 160 Z" fill="#FFFFFF" />
        <path d="M22 90 Q60 70 98 90 L104 116 Q60 130 16 116 Z" fill="#F3EFE4" />

        {/* waist sash */}
        <rect x="18" y="140" width="84" height="12" rx="6" fill="#DC6F2C" />

        {/* left arm holding wheat */}
        <path d="M24 96 Q2 118 8 152" stroke="#F4EFE3" strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* right arm bent, hand on hip */}
        <path d="M96 96 Q118 108 112 132" stroke="#EDE6D2" strokeWidth="16" strokeLinecap="round" fill="none" />

        {/* neck + head */}
        <rect x="50" y="58" width="20" height="18" fill="#C98A55" />
        <circle cx="60" cy="46" r="26" fill="#D89A63" />

        {/* turban */}
        <path d="M30 40 Q30 6 60 6 Q90 6 90 40 Q90 26 60 26 Q30 26 30 40 Z" fill="#DC6F2C" />
        <path d="M28 34 Q60 20 92 34 Q90 44 60 40 Q30 44 28 34 Z" fill="#E88F4F" />
        <circle cx="86" cy="30" r="5" fill="#F6C453" />

        {/* simple face */}
        <path d="M48 52 q12 8 24 0" stroke="#6B4A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="51" cy="44" r="2" fill="#3B2A1A" />
        <circle cx="69" cy="44" r="2" fill="#3B2A1A" />
        <path d="M48 40 q12 -6 24 0" stroke="#3B2A1A" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* wheat sheaf held in left hand */}
        <g transform="translate(-30,60) rotate(-18)">
          <rect x="0" y="40" width="6" height="60" rx="3" fill="#B96F18" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={3 + (i % 2 === 0 ? -10 : 10)} cy={38 - i * 11} rx="8" ry="15" fill="#F4DB97" transform={`rotate(${i % 2 === 0 ? -18 : 18} ${3 + (i % 2 === 0 ? -10 : 10)} ${38 - i * 11})`} />
          ))}
        </g>
      </g>

      {/* foreground crop rows */}
      <g opacity="0.85">
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${10 + i * 38} 350 q6 -18 0 -30`} stroke="#1F4E29" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.35" />
        ))}
      </g>
    </svg>
  )
}

/** Compact "farmer holding harvested crop" badge, used in cards / testimonials. */
export function FarmerCropBadge({ className = '' }) {
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label="Illustration of a farmer holding harvested grain">
      <defs>
        <linearGradient id="badgeBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E1F0E2" />
          <stop offset="100%" stopColor="#C3E2C6" />
        </linearGradient>
      </defs>
      <rect width="200" height="220" rx="24" fill="url(#badgeBg)" />
      <circle cx="100" cy="60" r="34" fill="#F6C453" opacity="0.5" />

      <g transform="translate(46,52)">
        <ellipse cx="54" cy="150" rx="46" ry="8" fill="#153A1D" opacity="0.12" />
        <rect x="30" y="96" width="16" height="50" rx="7" fill="#F4EFE3" />
        <rect x="58" y="96" width="16" height="50" rx="7" fill="#EDE6D2" />
        <path d="M18 40 Q54 24 90 40 L98 100 Q54 116 10 100 Z" fill="#FFFFFF" />
        <rect x="14" y="88" width="80" height="10" rx="5" fill="#3F934A" />
        <path d="M20 46 Q0 66 8 96" stroke="#F4EFE3" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M88 46 Q108 66 96 92" stroke="#EDE6D2" strokeWidth="14" strokeLinecap="round" fill="none" />
        <rect x="44" y="12" width="18" height="16" fill="#C98A55" />
        <circle cx="53" cy="2" r="22" fill="#D89A63" />
        <path d="M26 -4 Q26 -32 53 -32 Q80 -32 80 -4 Q80 -16 53 -16 Q26 -16 26 -4 Z" fill="#256130" />
        <path d="M24 -10 Q53 -22 82 -10 Q80 -2 53 -6 Q26 -2 24 -10 Z" fill="#3F934A" />
        <circle cx="46" cy="-1" r="1.8" fill="#3B2A1A" />
        <circle cx="60" cy="-1" r="1.8" fill="#3B2A1A" />
        <path d="M45 5 q8 5 16 0" stroke="#6B4A2E" strokeWidth="2" strokeLinecap="round" fill="none" />

        <g transform="translate(-4,64) rotate(-14)">
          <rect x="0" y="26" width="5" height="38" rx="2.5" fill="#B96F18" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={2 + (i % 2 === 0 ? -8 : 8)} cy={24 - i * 10} rx="6.5" ry="12" fill="#F4DB97" transform={`rotate(${i % 2 === 0 ? -16 : 16} ${2 + (i % 2 === 0 ? -8 : 8)} ${24 - i * 10})`} />
          ))}
        </g>
      </g>
    </svg>
  )
}

/** Friendly empty-state illustration: farmer + a clipboard/checklist, used for empty lists. */
export function EmptyStateIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 220 180" className={className} role="img" aria-label="Illustration of a farmer with a blank checklist">
      <ellipse cx="110" cy="160" rx="80" ry="10" fill="#1F4E29" opacity="0.07" />
      <circle cx="150" cy="46" r="30" fill="#F1F8F1" />
      <g transform="translate(56,30)">
        <rect x="20" y="70" width="14" height="46" rx="6" fill="#F4EFE3" />
        <rect x="44" y="70" width="14" height="46" rx="6" fill="#EDE6D2" />
        <path d="M10 30 Q40 16 70 30 L76 76 Q40 90 4 76 Z" fill="#FFFFFF" />
        <rect x="6" y="66" width="68" height="9" rx="4.5" fill="#65AF6D" />
        <rect x="34" y="0" width="14" height="12" fill="#C98A55" />
        <circle cx="41" cy="-8" r="18" fill="#D89A63" />
        <path d="M20 -12 Q20 -34 41 -34 Q62 -34 62 -12 Q62 -22 41 -22 Q20 -22 20 -12 Z" fill="#DC6F2C" />
        <circle cx="36" cy="-9" r="1.6" fill="#3B2A1A" />
        <circle cx="47" cy="-9" r="1.6" fill="#3B2A1A" />
      </g>
      {/* clipboard */}
      <g transform="translate(120,64)">
        <rect x="0" y="0" width="52" height="64" rx="8" fill="#FFFFFF" stroke="#C3E2C6" strokeWidth="2" />
        <rect x="14" y="-6" width="24" height="12" rx="4" fill="#3F934A" />
        <rect x="10" y="18" width="32" height="5" rx="2.5" fill="#E1F0E2" />
        <rect x="10" y="30" width="32" height="5" rx="2.5" fill="#E1F0E2" />
        <rect x="10" y="42" width="20" height="5" rx="2.5" fill="#E1F0E2" />
      </g>
    </svg>
  )
}

/** Success illustration for confirmations (token booked etc.) */
export function SuccessFarmerIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 240 200" className={className} role="img" aria-label="Illustration celebrating a successful booking">
      <circle cx="120" cy="100" r="86" fill="#E1F0E2" />
      <circle cx="120" cy="100" r="60" fill="#C3E2C6" opacity="0.7" />
      <g transform="translate(72,44)">
        <ellipse cx="48" cy="132" rx="42" ry="8" fill="#153A1D" opacity="0.12" />
        <rect x="26" y="82" width="15" height="46" rx="7" fill="#F4EFE3" />
        <rect x="52" y="82" width="15" height="46" rx="7" fill="#EDE6D2" />
        <path d="M14 34 Q48 18 82 34 L90 88 Q48 104 6 88 Z" fill="#FFFFFF" />
        <rect x="10" y="76" width="76" height="9" rx="4.5" fill="#3F934A" />
        <path d="M18 40 Q-4 56 4 82" stroke="#F4EFE3" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M80 34 Q104 40 100 20" stroke="#EDE6D2" strokeWidth="13" strokeLinecap="round" fill="none" />
        <rect x="40" y="4" width="16" height="14" fill="#C98A55" />
        <circle cx="48" cy="-6" r="20" fill="#D89A63" />
        <path d="M24 -10 Q24 -34 48 -34 Q72 -34 72 -10 Q72 -20 48 -20 Q24 -20 24 -10 Z" fill="#DC6F2C" />
        <circle cx="42" cy="-8" r="1.8" fill="#3B2A1A" />
        <circle cx="54" cy="-8" r="1.8" fill="#3B2A1A" />
        <path d="M41 -1 q7 5 14 0" stroke="#6B4A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* raised hand with check mark */}
        <circle cx="103" cy="14" r="15" fill="#3F934A" />
        <path d="M96 14 l5 5 l10 -11" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  )
}

/** Small circular avatar used for the farmer's profile in the header. */
export function FarmerAvatar({ className = '', size = 40 }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} role="img" aria-label="Farmer profile avatar">
      <circle cx="30" cy="30" r="30" fill="#DC6F2C" />
      <circle cx="30" cy="34" r="16" fill="#D89A63" />
      <path d="M14 26 Q14 8 30 8 Q46 8 46 26 Q46 16 30 16 Q14 16 14 26 Z" fill="#B96F18" />
      <path d="M18 44 Q30 54 42 44 L44 60 L16 60 Z" fill="#FFFFFF" />
      <circle cx="25" cy="34" r="1.6" fill="#3B2A1A" />
      <circle cx="35" cy="34" r="1.6" fill="#3B2A1A" />
    </svg>
  )
}

/** Tiny thumbnail illustrations used in the Tips & Updates cards (3 distinct scenes). */
export function TipArt({ variant = 'prices', className = '' }) {
  if (variant === 'msp') {
    return (
      <svg viewBox="0 0 120 80" className={className} role="img" aria-label="Illustration representing government policy update">
        <rect width="120" height="80" fill="#F1F8F1" />
        <rect x="20" y="18" width="80" height="52" rx="6" fill="#FFFFFF" stroke="#C3E2C6" strokeWidth="2" />
        <rect x="30" y="30" width="60" height="6" rx="3" fill="#3F934A" />
        <rect x="30" y="42" width="44" height="5" rx="2.5" fill="#C3E2C6" />
        <rect x="30" y="52" width="50" height="5" rx="2.5" fill="#C3E2C6" />
        <circle cx="80" cy="18" r="10" fill="#F6C453" />
        <path d="M76 18 l3 3 l6 -7" stroke="#7A5A0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  }
  if (variant === 'soil') {
    return (
      <svg viewBox="0 0 120 80" className={className} role="img" aria-label="Illustration of a healthy soil sapling">
        <rect width="120" height="80" fill="#F1F8F1" />
        <path d="M0 58 Q60 42 120 58 V80 H0 Z" fill="#8A5A2B" />
        <path d="M0 66 Q60 54 120 66 V80 H0 Z" fill="#6B4520" />
        <path d="M60 58 C60 40 46 34 46 20" stroke="#3F934A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M60 50 C60 36 74 32 74 20" stroke="#3F934A" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="46" cy="18" rx="8" ry="5" fill="#65AF6D" />
        <ellipse cx="74" cy="18" rx="8" ry="5" fill="#65AF6D" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 80" className={className} role="img" aria-label="Illustration of paddy crop growing">
      <rect width="120" height="80" fill="#F1F8F1" />
      <path d="M0 60 Q60 44 120 60 V80 H0 Z" fill="#5CA766" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M${14 + i * 18} 60 q4 -22 -2 -36`} stroke="#256130" strokeWidth="3" strokeLinecap="round" fill="none" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={`h-${i}`} cx={12 + i * 18} cy={22} rx="5" ry="9" fill="#F4DB97" />
      ))}
      <circle cx="100" cy="16" r="9" fill="#F6C453" />
    </svg>
  )
}

/** Support agent illustration for Help & Support card. */
export function SupportAgentIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label="Illustration of a support representative">
      <circle cx="80" cy="80" r="80" fill="#153A1D" />
      <circle cx="80" cy="80" r="80" fill="#1F4E29" opacity="0.4" />
      <g transform="translate(38,30)">
        <ellipse cx="42" cy="118" rx="36" ry="7" fill="#0D2413" opacity="0.3" />
        <path d="M8 60 Q42 42 76 60 L82 118 Q42 132 2 118 Z" fill="#F1F8F1" />
        <rect x="4" y="54" width="76" height="10" rx="5" fill="#3F934A" />
        <rect x="30" y="6" width="16" height="14" fill="#C98A55" />
        <circle cx="38" cy="-4" r="20" fill="#E7B98A" />
        <path d="M52 -10 Q66 -2 60 16" stroke="#3B2A1A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="33" cy="-4" r="1.8" fill="#3B2A1A" />
        <circle cx="45" cy="-4" r="1.8" fill="#3B2A1A" />
        <path d="M32 4 q7 5 14 0" stroke="#6B4A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* headset */}
        <path d="M16 -6 Q16 -30 38 -30 Q60 -30 60 -6" stroke="#153A1D" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="-2" r="5" fill="#153A1D" />
        <path d="M16 3 L16 12 Q16 18 24 18" stroke="#153A1D" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
