import React, { useEffect, useState } from "react";
import { getActiveTheme } from "@/config/theme";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  iconIndex: number;
  drift: number;
}

/* ══════════════════════════════════════════════════
   PARTICLE ICONS
   ══════════════════════════════════════════════════ */
const MoonSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10" fill="currentColor"/>
    <circle cx="22" cy="18" r="2.5" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="30" r="1.5" fill="currentColor" opacity="0.35"/>
  </svg>
);
const StarSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon points="12,2 14.5,9 22,9 16,13.5 18,21 12,16.5 6,21 8,13.5 2,9 9.5,9" fill="currentColor"/>
  </svg>
);
const LanternSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 60" fill="none">
    <rect x="16" y="5" width="8" height="4" rx="1" fill="currentColor" opacity="0.8"/>
    <path d="M10 12 Q10 9 16 9 H24 Q30 9 30 12 V35 Q30 42 20 46 Q10 42 10 35 Z" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="0.6"/>
    <line x1="20" y1="46" x2="20" y2="56" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
  </svg>
);
const KetupaSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 60" fill="none">
    <rect x="10" y="15" width="30" height="30" rx="3" fill="currentColor" opacity="0.65" transform="rotate(45 25 30)"/>
    <rect x="17" y="22" width="16" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" transform="rotate(45 25 30)"/>
    <line x1="25" y1="5" x2="25" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="25" y1="48" x2="25" y2="55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const FlagSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 70 50" fill="none">
    <rect x="6" y="6" width="58" height="19" rx="2" fill="currentColor" opacity="0.9"/>
    <rect x="6" y="25" width="58" height="19" rx="2" fill="currentColor" opacity="0.2"/>
    <line x1="6" y1="6" x2="6" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const StarBurstSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="10" fill="currentColor" opacity="0.5"/>
    <path d="M30 5L30 12M30 48L30 55M5 30L12 30M48 30L55 30M11 11L16 16M44 44L49 49M49 11L44 16M16 44L11 49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const GarungSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 5 L33 18 L46 18 L36 26 L40 40 L30 32 L20 40 L24 26 L14 18 L27 18 Z" fill="currentColor" opacity="0.8"/>
  </svg>
);

const HeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor"/>
  </svg>
);
const SmallHeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path d="M20 34 C6 24 0 14 10 8 C14 5 17 7 20 12 C23 7 26 5 30 8 C40 14 34 24 20 34Z" fill="currentColor" opacity="0.7"/>
  </svg>
);
const SparkSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 8L19 8L14.5 11.5L16.5 17.5L12 14L7.5 17.5L9.5 11.5L5 8L10.5 8Z" fill="currentColor"/>
    <circle cx="4" cy="4" r="1.5" fill="currentColor" opacity="0.6"/>
    <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.6"/>
  </svg>
);
const RibbonSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 30 Q15 20 10 8 Q22 12 30 22 Q38 12 50 8 Q45 20 30 30Z" fill="currentColor" opacity="0.7"/>
    <path d="M30 30 Q15 40 10 52 Q22 48 30 38 Q38 48 50 52 Q45 40 30 30Z" fill="currentColor" opacity="0.6"/>
    <circle cx="30" cy="30" r="3.5" fill="currentColor"/>
  </svg>
);

const TreeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 80" fill="none">
    <polygon points="30,5 12,32 48,32" fill="currentColor" opacity="0.85"/>
    <polygon points="30,22 7,54 53,54" fill="currentColor" opacity="0.75"/>
    <rect x="24" y="54" width="12" height="16" rx="1.5" fill="currentColor" opacity="0.65"/>
    <circle cx="30" cy="11" r="3" fill="currentColor"/>
  </svg>
);
const SnowflakeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.5"/>
    <path d="M40 15l-5-7M40 15l5-7M40 65l-5 7M40 65l5 7M15 40l-7-5M15 40l-7 5M65 40l7-5M65 40l7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M22 22l-4-7M22 22l-7-4M58 22l4-7M58 22l7-4M22 58l-4 7M22 58l-7 4M58 58l4 7M58 58l7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
  </svg>
);
const GiftSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <rect x="8" y="26" width="44" height="28" rx="3" fill="currentColor" opacity="0.65"/>
    <rect x="6" y="16" width="48" height="12" rx="2" fill="currentColor" opacity="0.75"/>
    <line x1="30" y1="16" x2="30" y2="54" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <path d="M30 16 Q22 8 16 12 Q10 16 18 20 Q24 22 30 16Z" fill="currentColor" opacity="0.8"/>
    <path d="M30 16 Q38 8 44 12 Q50 16 42 20 Q36 22 30 16Z" fill="currentColor" opacity="0.8"/>
  </svg>
);

const FlowerSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="18" r="10" fill="currentColor" opacity="0.55"/>
    <circle cx="18" cy="32" r="10" fill="currentColor" opacity="0.55"/>
    <circle cx="42" cy="32" r="10" fill="currentColor" opacity="0.55"/>
    <circle cx="22" cy="44" r="10" fill="currentColor" opacity="0.55"/>
    <circle cx="38" cy="44" r="10" fill="currentColor" opacity="0.55"/>
    <circle cx="30" cy="32" r="6" fill="currentColor" opacity="0.95"/>
  </svg>
);
const LeafSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 55 L30 25 M30 25 Q15 20 10 8 Q20 16 30 13 Q40 16 50 8 Q45 20 30 25" fill="currentColor" opacity="0.75" stroke="currentColor" strokeWidth="0.8"/>
  </svg>
);
const ButterflyPath = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 40" fill="none">
    <path d="M30 20 Q12 5 5 12 Q0 20 8 28 Q16 36 30 20" fill="currentColor" opacity="0.6"/>
    <path d="M30 20 Q48 5 55 12 Q60 20 52 28 Q44 36 30 20" fill="currentColor" opacity="0.6"/>
    <ellipse cx="30" cy="20" rx="3" ry="6" fill="currentColor" opacity="0.9"/>
  </svg>
);
const CherryBlossomSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <ellipse cx="25" cy="12" rx="7" ry="10" fill="currentColor" opacity="0.7"/>
    <ellipse cx="38" cy="20" rx="7" ry="10" fill="currentColor" opacity="0.7" transform="rotate(72 38 20)"/>
    <ellipse cx="33" cy="36" rx="7" ry="10" fill="currentColor" opacity="0.7" transform="rotate(144 33 36)"/>
    <ellipse cx="17" cy="36" rx="7" ry="10" fill="currentColor" opacity="0.7" transform="rotate(216 17 36)"/>
    <ellipse cx="12" cy="20" rx="7" ry="10" fill="currentColor" opacity="0.7" transform="rotate(288 12 20)"/>
    <circle cx="25" cy="25" r="4" fill="currentColor"/>
  </svg>
);

const SunSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="12" fill="currentColor"/>
    <path d="M30 5L30 13M30 47L30 55M5 30L13 30M47 30L55 30M11 11L17 17M43 43L49 49M49 11L43 17M17 43L11 49" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);
const WaveSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 40" fill="none">
    <path d="M0 28 Q10 12 20 20 Q30 28 40 20 Q50 12 60 20 Q70 28 80 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M0 36 Q10 20 20 28 Q30 36 40 28 Q50 20 60 28 Q70 36 80 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
  </svg>
);
const PalmSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 80" fill="none">
    <path d="M30 32 Q26 62 28 76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
    <path d="M30 32 Q14 14 4 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M30 32 Q46 14 56 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M30 32 Q16 24 6 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75"/>
    <path d="M30 32 Q44 24 54 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75"/>
  </svg>
);
const StarfishSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 5 L34 22 L50 18 L38 30 L46 46 L30 38 L14 46 L22 30 L10 18 L26 22 Z" fill="currentColor" opacity="0.8"/>
    <circle cx="30" cy="30" r="5" fill="currentColor"/>
  </svg>
);
const ShellSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 10 Q50 10 52 30 Q54 50 30 52 Q6 54 8 30 Q10 10 30 10" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1"/>
    <path d="M30 10 L30 50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <path d="M14 22 Q30 18 46 22" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
    <path d="M10 33 Q30 28 50 33" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>
);

const MapleLeafSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 55 L30 30 M30 30 Q14 24 9 9 Q20 18 30 15 Q40 18 51 9 Q46 24 30 30" fill="currentColor" opacity="0.9"/>
    <path d="M19 36 Q9 31 7 24" stroke="currentColor" strokeWidth="1.5" opacity="0.65"/>
    <path d="M41 36 Q51 31 53 24" stroke="currentColor" strokeWidth="1.5" opacity="0.65"/>
  </svg>
);
const OakLeafSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <path d="M30 52 L30 28 M30 28 Q22 22 16 26 Q10 20 18 14 Q24 10 28 16 Q30 8 32 16 Q36 10 42 14 Q50 20 44 26 Q38 22 30 28" fill="currentColor" opacity="0.85"/>
  </svg>
);
const AcornSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 60" fill="none">
    <ellipse cx="20" cy="35" rx="12" ry="16" fill="currentColor" opacity="0.75"/>
    <path d="M8 28 Q20 20 32 28" fill="currentColor" opacity="0.9"/>
    <path d="M16 18 Q20 10 24 18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7"/>
  </svg>
);

const BigSnowflakeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.5"/>
    <path d="M40 15l-6-8M40 15l6-8M40 65l-6 8M40 65l6 8M15 40l-8-6M15 40l-8 6M65 40l8-6M65 40l8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M22 22l-4-8M22 22l-8-4M58 22l4-8M58 22l8-4M22 58l-4 8M22 58l-8 4M58 58l4 8M58 58l8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
  </svg>
);
const IceCrystalSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <polygon points="25,3 31,18 47,18 34,27 39,43 25,33 11,43 16,27 3,18 19,18" fill="currentColor" opacity="0.75" stroke="currentColor" strokeWidth="0.8"/>
    <polygon points="25,10 28,19 37,19 30,24 32,33 25,28 18,33 20,24 13,19 22,19" fill="currentColor" opacity="0.35"/>
  </svg>
);
const SnowballSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <circle cx="25" cy="25" r="18" fill="currentColor" opacity="0.55"/>
    <circle cx="19" cy="20" r="4" fill="white" opacity="0.25"/>
    <circle cx="33" cy="17" r="2.5" fill="white" opacity="0.2"/>
  </svg>
);

type SvgIconComponent = React.FC<{ size: number }>;

const themeParticleIcons: Record<string, SvgIconComponent[]> = {
  lebaran:     [MoonSVG, StarSVG, LanternSVG, KetupaSVG, MoonSVG],
  kemerdekaan: [FlagSVG, StarSVG, StarBurstSVG, GarungSVG, FlagSVG],
  valentine:   [HeartSVG, SmallHeartSVG, SparkSVG, RibbonSVG, HeartSVG],
  natal:       [SnowflakeSVG, TreeSVG, GiftSVG, SnowflakeSVG, StarSVG],
  semi:        [FlowerSVG, LeafSVG, ButterflyPath, CherryBlossomSVG, FlowerSVG],
  panas:       [SunSVG, WaveSVG, PalmSVG, StarfishSVG, ShellSVG],
  gugur:       [MapleLeafSVG, OakLeafSVG, AcornSVG, MapleLeafSVG, OakLeafSVG],
  winter:      [BigSnowflakeSVG, IceCrystalSVG, SnowballSVG, BigSnowflakeSVG, IceCrystalSVG],
};

/* ══════════════════════════════════════════════════
   SECTION DECORATION SVGs (big, subtle bg decorations)
   ══════════════════════════════════════════════════ */

// ── Reusable big deco SVGs ──
const DecoSnowflake = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.3"/>
    <path d="M40 15l-5-7M40 15l5-7M40 65l-5 7M40 65l5 7M15 40l-7-5M15 40l-7 5M65 40l7-5M65 40l7 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M22 22l-4-7M22 22l-7-4M58 22l4-7M58 22l7-4M22 58l-4 7M22 58l-7 4M58 58l4 7M58 58l7 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
  </svg>
);
const DecoIceCrystal = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <polygon points="30,4 36,20 54,20 40,30 46,47 30,37 14,47 20,30 6,20 24,20" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.12"/>
  </svg>
);
const DecoFrostCorner = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 100 100" fill="none">
    <path d="M5 5 Q30 5 50 25 Q60 35 55 50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.12" strokeLinecap="round"/>
    <path d="M5 5 Q5 30 25 50 Q35 60 50 55" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.12" strokeLinecap="round"/>
    <circle cx="5" cy="5" r="3" fill="currentColor" opacity="0.08"/>
    <circle cx="25" cy="8" r="2" fill="currentColor" opacity="0.07"/>
    <circle cx="8" cy="25" r="2" fill="currentColor" opacity="0.07"/>
    <circle cx="40" cy="15" r="1.5" fill="currentColor" opacity="0.06"/>
    <circle cx="15" cy="40" r="1.5" fill="currentColor" opacity="0.06"/>
  </svg>
);

const DecoCrescent = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"/>
    <circle cx="22" cy="18" r="2.2" fill="currentColor" opacity="0.09"/>
    <circle cx="15" cy="30" r="1.4" fill="currentColor" opacity="0.07"/>
  </svg>
);
const DecoLantern = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 40 60" fill="none">
    <rect x="15" y="5" width="10" height="4" rx="1" fill="currentColor" opacity="0.09"/>
    <path d="M10 12 Q10 9 15 9 H25 Q30 9 30 12 V35 Q30 42 20 45 Q10 42 10 35 Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12"/>
    <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="0.6" opacity="0.08"/>
    <line x1="12" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="0.6" opacity="0.06"/>
    <line x1="20" y1="45" x2="20" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.08"/>
  </svg>
);
const DecoStarOrnament = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 50 50" fill="none">
    <path d="M25 5 L28 18 L42 18 L31 26 L35 40 L25 32 L15 40 L19 26 L8 18 L22 18 Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
  </svg>
);
const DecoKetupat = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 50 60" fill="none">
    <rect x="8" y="15" width="34" height="30" rx="3" fill="currentColor" opacity="0.05" transform="rotate(45 25 30)" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
    <rect x="16" y="22" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.07" transform="rotate(45 25 30)"/>
  </svg>
);

const DecoFlag = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 80 50" fill="none">
    <rect x="5" y="5" width="70" height="20" rx="2" fill="currentColor" opacity="0.07"/>
    <rect x="5" y="25" width="70" height="20" rx="2" fill="currentColor" opacity="0.022"/>
    <line x1="5" y1="5" x2="5" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.08"/>
  </svg>
);
const DecoKrisSVG = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 30 80" fill="none">
    <path d="M15 5 Q12 15 15 25 Q18 35 15 45 Q12 55 15 65 L15 75" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.08" strokeLinecap="round"/>
    <path d="M10 10 Q15 5 20 10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" opacity="0.1"/>
  </svg>
);
const DecoGarung = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 5 L33 18 L46 18 L36 26 L40 40 L30 32 L20 40 L24 26 L14 18 L27 18 Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
  </svg>
);

const DecoHeart = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12"/>
  </svg>
);
const DecoRibbon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 30 Q15 20 10 8 Q22 12 30 22 Q38 12 50 8 Q45 20 30 30Z" fill="currentColor" opacity="0.055"/>
    <path d="M30 30 Q15 40 10 52 Q22 48 30 38 Q38 48 50 52 Q45 40 30 30Z" fill="currentColor" opacity="0.045"/>
    <circle cx="30" cy="30" r="3.5" fill="currentColor" opacity="0.07"/>
  </svg>
);
const DecoDots = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 80 80" fill="none">
    {[16,32,48,64].map(x => [16,32,48,64].map(y => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="currentColor" opacity="0.04"/>
    )))}
  </svg>
);

const DecoTree = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 80" fill="none">
    <polygon points="30,5 12,32 48,32" fill="currentColor" opacity="0.055" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
    <polygon points="30,22 7,54 53,54" fill="currentColor" opacity="0.045" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08"/>
    <rect x="24" y="54" width="12" height="16" rx="1.5" fill="currentColor" opacity="0.06"/>
    <circle cx="30" cy="11" r="3" fill="currentColor" opacity="0.09"/>
  </svg>
);
const DecoGift = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <rect x="8" y="26" width="44" height="28" rx="3" fill="currentColor" opacity="0.05"/>
    <rect x="6" y="16" width="48" height="12" rx="2" fill="currentColor" opacity="0.065"/>
    <line x1="30" y1="16" x2="30" y2="54" stroke="currentColor" strokeWidth="1.5" opacity="0.04"/>
    <path d="M30 16 Q22 8 16 12 Q10 16 18 20 Q24 22 30 16Z" fill="currentColor" opacity="0.07"/>
    <path d="M30 16 Q38 8 44 12 Q50 16 42 20 Q36 22 30 16Z" fill="currentColor" opacity="0.07"/>
  </svg>
);

const DecoFlower = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="18" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="18" cy="32" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="42" cy="32" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="22" cy="44" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="38" cy="44" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="30" cy="32" r="6" fill="currentColor" opacity="0.1"/>
  </svg>
);
const DecoCherryBlossom = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 50 50" fill="none">
    <ellipse cx="25" cy="12" rx="7" ry="10" fill="currentColor" opacity="0.04"/>
    <ellipse cx="38" cy="20" rx="7" ry="10" fill="currentColor" opacity="0.04" transform="rotate(72 38 20)"/>
    <ellipse cx="33" cy="36" rx="7" ry="10" fill="currentColor" opacity="0.04" transform="rotate(144 33 36)"/>
    <ellipse cx="17" cy="36" rx="7" ry="10" fill="currentColor" opacity="0.04" transform="rotate(216 17 36)"/>
    <ellipse cx="12" cy="20" rx="7" ry="10" fill="currentColor" opacity="0.04" transform="rotate(288 12 20)"/>
    <circle cx="25" cy="25" r="4" fill="currentColor" opacity="0.07"/>
  </svg>
);
const DecoButterfly = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 40" fill="none">
    <path d="M30 20 Q12 5 5 12 Q0 20 8 28 Q16 36 30 20" fill="currentColor" opacity="0.05"/>
    <path d="M30 20 Q48 5 55 12 Q60 20 52 28 Q44 36 30 20" fill="currentColor" opacity="0.05"/>
    <ellipse cx="30" cy="20" rx="3" ry="6" fill="currentColor" opacity="0.07"/>
  </svg>
);

const DecoSun = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.1"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.18"/>
    <path d="M50 8L50 18M50 82L50 92M8 50L18 50M82 50L92 50M19 19L26 26M74 74L81 81M81 19L74 26M26 74L19 81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.18"/>
    <path d="M50 2L50 10M50 90L50 98M2 50L10 50M90 50L98 50M14 14L20 20M80 80L86 86M86 14L80 20M20 80L14 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.1"/>
  </svg>
);
const DecoWave = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
    <path d="M0 40 Q25 15 50 30 Q75 45 100 30 Q125 15 150 30 Q175 45 200 30 L200 60 L0 60Z" fill="currentColor" opacity="0.055"/>
    <path d="M0 48 Q25 28 50 38 Q75 48 100 38 Q125 28 150 38 Q175 48 200 38 L200 60 L0 60Z" fill="currentColor" opacity="0.035"/>
    <path d="M0 32 Q25 12 50 25 Q75 38 100 25 Q125 12 150 25 Q175 38 200 25" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.09"/>
  </svg>
);
const DecoPalm = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 70 100" fill="none">
    <path d="M35 40 Q31 72 33 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.1"/>
    <path d="M35 40 Q17 18 5 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.12"/>
    <path d="M35 40 Q53 18 65 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.12"/>
    <path d="M35 40 Q20 28 8 32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.09"/>
    <path d="M35 40 Q50 28 62 32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.09"/>
    <path d="M35 40 Q22 36 12 42" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.07"/>
    <path d="M35 40 Q48 36 58 42" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.07"/>
  </svg>
);
const DecoStarfish = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 5 L34 22 L50 18 L38 30 L46 46 L30 38 L14 46 L22 30 L10 18 L26 22 Z" fill="currentColor" opacity="0.065"/>
    <circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.055"/>
  </svg>
);
const DecoShell = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 10 Q50 10 52 30 Q54 50 30 52 Q6 54 8 30 Q10 10 30 10" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.09"/>
    <path d="M30 10 L30 50" stroke="currentColor" strokeWidth="0.8" opacity="0.05"/>
    <path d="M14 22 Q30 18 46 22" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.05"/>
    <path d="M10 33 Q30 28 50 33" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.05"/>
  </svg>
);

const DecoMapleLeaf = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 55 L30 30 M30 30 Q14 24 9 9 Q20 18 30 15 Q40 18 51 9 Q46 24 30 30" fill="currentColor" opacity="0.065" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"/>
    <path d="M19 36 Q9 31 7 24" stroke="currentColor" strokeWidth="0.8" opacity="0.06"/>
    <path d="M41 36 Q51 31 53 24" stroke="currentColor" strokeWidth="0.8" opacity="0.06"/>
  </svg>
);
const DecoOakLeaf = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 52 L30 28 M30 28 Q22 22 16 26 Q10 20 18 14 Q24 10 28 16 Q30 8 32 16 Q36 10 42 14 Q50 20 44 26 Q38 22 30 28" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoAcorn = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 40 60" fill="none">
    <ellipse cx="20" cy="35" rx="12" ry="16" fill="currentColor" opacity="0.055"/>
    <path d="M8 28 Q20 20 32 28" fill="currentColor" opacity="0.08"/>
  </svg>
);

interface DecoPos {
  top?: string; bottom?: string; left?: string; right?: string;
  width: string; height?: string; opacity: number; rotate?: string;
}
interface SectionDecoration {
  Component: React.FC<{ style?: React.CSSProperties }>;
  positions: DecoPos[];
}

const themeDecorations: Record<string, SectionDecoration[]> = {
  // ── WINTER ──────────────────────────────────────────────
  winter: [
    { Component: DecoSnowflake, positions: [
      { top: "3%",  left: "2%",  width: "72px", opacity: 0.18, rotate: "12deg" },
      { top: "10%", right: "3%", width: "52px", opacity: 0.14, rotate: "-22deg" },
      { bottom: "7%", left: "5%", width: "60px", opacity: 0.15, rotate: "35deg" },
      { bottom: "16%", right: "2%", width: "46px", opacity: 0.11, rotate: "-8deg" },
      { top: "42%", left: "1%",  width: "38px", opacity: 0.09, rotate: "50deg" },
      { top: "36%", right: "1%", width: "42px", opacity: 0.09, rotate: "-40deg" },
      { top: "22%", left: "48%", width: "28px", opacity: 0.06, rotate: "20deg" },
    ]},
    { Component: DecoIceCrystal, positions: [
      { top: "28%",    right: "2%", width: "64px", opacity: 1.0 },
      { bottom: "28%", left: "2%", width: "58px", opacity: 1.0 },
      { top: "55%",    left: "44%", width: "44px", opacity: 1.0, rotate: "30deg" },
    ]},
    { Component: DecoFrostCorner, positions: [
      { top: "0%",    left: "0%",  width: "120px", opacity: 1.0 },
      { top: "0%",    right: "0%", width: "120px", opacity: 1.0, rotate: "90deg" },
      { bottom: "0%", left: "0%",  width: "100px", opacity: 1.0, rotate: "-90deg" },
      { bottom: "0%", right: "0%", width: "100px", opacity: 1.0, rotate: "180deg" },
    ]},
  ],
  // ── LEBARAN ─────────────────────────────────────────────
  lebaran: [
    { Component: DecoCrescent, positions: [
      { top: "3%",  right: "4%", width: "75px", opacity: 0.16 },
      { bottom: "10%", left: "3%", width: "60px", opacity: 0.11, rotate: "18deg" },
      { top: "42%", right: "2%", width: "48px", opacity: 0.08, rotate: "-10deg" },
    ]},
    { Component: DecoLantern, positions: [
      { top: "6%",  left: "5%",  width: "42px", opacity: 1.0 },
      { top: "8%",  right: "7%", width: "36px", opacity: 1.0 },
      { bottom: "18%", right: "4%", width: "38px", opacity: 1.0 },
      { bottom: "25%", left: "6%", width: "32px", opacity: 1.0 },
    ]},
    { Component: DecoKetupat, positions: [
      { top: "20%", left: "2%",  width: "55px", opacity: 1.0, rotate: "15deg" },
      { bottom: "12%", right: "3%", width: "48px", opacity: 1.0, rotate: "-20deg" },
      { top: "60%", left: "40%", width: "36px", opacity: 1.0, rotate: "30deg" },
    ]},
    { Component: DecoStarOrnament, positions: [
      { top: "35%", right: "5%", width: "44px", opacity: 1.0 },
      { bottom: "35%", left: "5%", width: "38px", opacity: 1.0, rotate: "20deg" },
      { top: "15%", left: "40%", width: "30px", opacity: 1.0 },
    ]},
  ],
  // ── KEMERDEKAAN ─────────────────────────────────────────
  kemerdekaan: [
    { Component: DecoFlag, positions: [
      { top: "4%",  right: "3%", width: "85px", opacity: 1.0 },
      { bottom: "6%", left: "4%", width: "72px", opacity: 1.0, rotate: "4deg" },
      { top: "38%", right: "1%", width: "58px", opacity: 1.0, rotate: "-5deg" },
      { top: "20%", left: "3%", width: "52px", opacity: 1.0, rotate: "8deg" },
    ]},
    { Component: DecoGarung, positions: [
      { top: "12%", left: "6%",  width: "50px", opacity: 1.0, rotate: "10deg" },
      { top: "16%", right: "6%", width: "44px", opacity: 1.0, rotate: "-15deg" },
      { bottom: "20%", left: "5%", width: "40px", opacity: 1.0, rotate: "25deg" },
      { bottom: "14%", right: "5%", width: "36px", opacity: 1.0, rotate: "-30deg" },
    ]},
    { Component: DecoKrisSVG, positions: [
      { top: "30%", left: "1%",  width: "28px", height: "75px", opacity: 1.0 },
      { top: "28%", right: "1%", width: "28px", height: "75px", opacity: 1.0, rotate: "5deg" },
    ]},
  ],
  // ── VALENTINE ───────────────────────────────────────────
  valentine: [
    { Component: DecoHeart, positions: [
      { top: "3%",  left: "4%",  width: "65px",  opacity: 0.14 },
      { top: "7%",  right: "3%", width: "52px",  opacity: 0.10, rotate: "15deg" },
      { bottom: "10%", right: "6%", width: "58px", opacity: 0.09, rotate: "-12deg" },
      { bottom: "5%",  left: "2%", width: "45px",  opacity: 0.09 },
      { top: "40%",    left: "1%", width: "38px",  opacity: 0.08, rotate: "20deg" },
      { top: "33%",   right: "1%", width: "40px",  opacity: 0.08, rotate: "-18deg" },
      { top: "55%",   left: "45%", width: "28px",  opacity: 0.06 },
    ]},
    { Component: DecoRibbon, positions: [
      { top: "18%", left: "3%",  width: "55px", opacity: 1.0, rotate: "-10deg" },
      { top: "22%", right: "3%", width: "50px", opacity: 1.0, rotate: "10deg" },
      { bottom: "22%", left: "4%", width: "44px", opacity: 1.0, rotate: "15deg" },
      { bottom: "28%", right: "4%", width: "40px", opacity: 1.0, rotate: "-15deg" },
    ]},
    { Component: DecoDots, positions: [
      { top: "0%",    left: "0%",   width: "120px", opacity: 1.0 },
      { bottom: "0%", right: "0%",  width: "120px", opacity: 1.0 },
    ]},
  ],
  // ── NATAL ───────────────────────────────────────────────
  natal: [
    { Component: DecoTree, positions: [
      { bottom: "4%",  left: "2%",  width: "60px", opacity: 0.14 },
      { bottom: "5%",  right: "4%", width: "54px", opacity: 0.11 },
      { bottom: "2%",  left: "30%", width: "44px", opacity: 0.08 },
    ]},
    { Component: DecoSnowflake, positions: [
      { top: "3%",  left: "4%",  width: "48px", opacity: 0.12, rotate: "20deg" },
      { top: "7%",  right: "4%", width: "40px", opacity: 0.09, rotate: "48deg" },
      { top: "40%", right: "2%", width: "42px", opacity: 0.08, rotate: "-30deg" },
      { top: "36%", left: "2%",  width: "38px", opacity: 0.08, rotate: "65deg" },
      { top: "20%", left: "45%", width: "28px", opacity: 0.06, rotate: "15deg" },
    ]},
    { Component: DecoGift, positions: [
      { bottom: "8%",  left: "6%",  width: "55px", opacity: 1.0, rotate: "-8deg" },
      { bottom: "10%", right: "6%", width: "50px", opacity: 1.0, rotate: "10deg" },
      { top: "15%",    left: "5%",  width: "42px", opacity: 1.0, rotate: "5deg" },
    ]},
  ],
  // ── SEMI (SPRING) ───────────────────────────────────────
  semi: [
    { Component: DecoFlower, positions: [
      { top: "3%",  left: "2%",  width: "68px", opacity: 0.13 },
      { top: "7%",  right: "4%", width: "56px", opacity: 0.10, rotate: "30deg" },
      { bottom: "7%",  left: "4%",  width: "52px", opacity: 0.09 },
      { bottom: "12%", right: "3%", width: "48px", opacity: 0.08, rotate: "-20deg" },
      { top: "42%",    left: "1%",  width: "36px", opacity: 0.07, rotate: "15deg" },
      { top: "38%",   right: "1%", width: "38px", opacity: 0.07, rotate: "-25deg" },
    ]},
    { Component: DecoCherryBlossom, positions: [
      { top: "16%", left: "5%",  width: "52px", opacity: 1.0, rotate: "-10deg" },
      { top: "20%", right: "5%", width: "46px", opacity: 1.0, rotate: "15deg" },
      { bottom: "20%", left: "6%", width: "42px", opacity: 1.0, rotate: "20deg" },
      { bottom: "26%", right: "6%", width: "38px", opacity: 1.0, rotate: "-12deg" },
    ]},
    { Component: DecoButterfly, positions: [
      { top: "30%", right: "3%", width: "55px", opacity: 1.0 },
      { bottom: "32%", left: "3%", width: "50px", opacity: 1.0, rotate: "10deg" },
      { top: "55%", left: "44%", width: "40px", opacity: 1.0 },
    ]},
  ],
  // ── PANAS (SUMMER) ──────────────────────────────────────
  panas: [
    { Component: DecoSun, positions: [
      { top: "1%",  right: "3%",  width: "120px", opacity: 1.0 },
      { bottom: "4%", left: "2%", width: "85px",  opacity: 1.0, rotate: "20deg" },
      { top: "40%", left: "0%",   width: "65px",  opacity: 1.0, rotate: "-15deg" },
    ]},
    { Component: DecoWave, positions: [
      { bottom: "0%", left: "0%",  width: "100%", height: "60px", opacity: 1.0 },
    ]},
    { Component: DecoPalm, positions: [
      { bottom: "0%", left: "0%",   width: "85px",  opacity: 1.0 },
      { bottom: "0%", right: "0%",  width: "75px",  opacity: 1.0, rotate: "6deg" },
    ]},
    { Component: DecoStarfish, positions: [
      { top: "10%", left: "5%",    width: "55px", opacity: 1.0, rotate: "15deg" },
      { top: "18%", right: "5%",   width: "48px", opacity: 1.0, rotate: "-20deg" },
      { bottom: "20%", left: "4%",  width: "42px", opacity: 1.0, rotate: "30deg" },
    ]},
    { Component: DecoShell, positions: [
      { top: "32%", right: "3%",   width: "50px", opacity: 1.0, rotate: "10deg" },
      { bottom: "28%", left: "3%", width: "44px", opacity: 1.0, rotate: "-8deg" },
      { top: "55%", left: "44%",   width: "36px", opacity: 1.0, rotate: "25deg" },
    ]},
  ],
  // ── GUGUR (AUTUMN) ──────────────────────────────────────
  gugur: [
    { Component: DecoMapleLeaf, positions: [
      { top: "3%",     right: "3%", width: "62px", opacity: 0.14, rotate: "22deg" },
      { top: "10%",    left: "4%",  width: "52px", opacity: 0.11, rotate: "-18deg" },
      { bottom: "7%",  right: "6%", width: "56px", opacity: 0.10, rotate: "42deg" },
      { bottom: "12%", left: "2%",  width: "44px", opacity: 0.09, rotate: "-32deg" },
      { top: "38%",   right: "1%", width: "38px", opacity: 0.08, rotate: "55deg" },
      { top: "35%",    left: "1%",  width: "36px", opacity: 0.07, rotate: "-50deg" },
      { top: "55%",   left: "44%", width: "28px", opacity: 0.06, rotate: "30deg" },
    ]},
    { Component: DecoOakLeaf, positions: [
      { top: "20%", right: "4%", width: "48px", opacity: 1.0, rotate: "-25deg" },
      { top: "24%", left: "4%",  width: "42px", opacity: 1.0, rotate: "18deg" },
      { bottom: "20%", right: "5%", width: "40px", opacity: 1.0, rotate: "35deg" },
      { bottom: "16%", left: "5%",  width: "36px", opacity: 1.0, rotate: "-40deg" },
    ]},
    { Component: DecoAcorn, positions: [
      { top: "14%",    left: "6%",  width: "38px", opacity: 1.0, rotate: "10deg" },
      { top: "16%",    right: "6%", width: "34px", opacity: 1.0, rotate: "-15deg" },
      { bottom: "28%", left: "4%",  width: "32px", opacity: 1.0, rotate: "20deg" },
      { bottom: "24%", right: "4%", width: "30px", opacity: 1.0, rotate: "-10deg" },
    ]},
  ],
};

/* ── Section SVG Decorations Component ── */
export const SectionDecorations = ({ section }: { section?: string }) => {
  const theme = getActiveTheme();
  if (theme === "default") return null;

  const decorations = themeDecorations[theme];
  if (!decorations) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {decorations.map((deco, di) =>
        deco.positions.map((pos, pi) => (
          <div
            key={`${di}-${pi}`}
            className="absolute text-primary"
            style={{
              top: pos.top,
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              width: pos.width,
              height: pos.height ?? pos.width,
              opacity: pos.opacity,
              transform: pos.rotate ? `rotate(${pos.rotate})` : undefined,
            }}
          >
            <deco.Component style={{ width: "100%", height: "100%" }} />
          </div>
        ))
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   FLOATING PARTICLES
   ══════════════════════════════════════════════════ */
const SeasonalDecorations = () => {
  const theme = getActiveTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (theme === "default") return;
    const icons = themeParticleIcons[theme] || [];
    const counts: Record<string, number> = {
      winter: 30, panas: 26, natal: 28, semi: 22, gugur: 24, valentine: 24, lebaran: 22, kemerdekaan: 20,
    };
    const count = counts[theme] ?? 20;
    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 7,
      size: theme === "winter" ? 10 + Math.random() * 18
           : theme === "panas" ? 12 + Math.random() * 16
           : theme === "natal" ? 10 + Math.random() * 16
           : 10 + Math.random() * 14,
      iconIndex: Math.floor(Math.random() * icons.length),
      drift: (Math.random() - 0.5) * 60,
    }));
    setParticles(items);
  }, [theme]);

  if (theme === "default") return null;

  const icons = themeParticleIcons[theme] || [];

  const colorMap: Record<string, string> = {
    lebaran:     "hsl(145 45% 55%)",
    kemerdekaan: "hsl(0 70% 55%)",
    valentine:   "hsl(345 65% 62%)",
    natal:       "hsl(145 50% 45%)",
    semi:        "hsl(330 55% 65%)",
    panas:       "hsl(42 90% 52%)",
    gugur:       "hsl(22 60% 48%)",
    winter:      "hsl(210 60% 72%)",
  };

  return (
    <div className="seasonal-particles pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map((p) => {
        const IconComponent = icons[p.iconIndex];
        if (!IconComponent) return null;
        return (
          <span
            key={p.id}
            className="seasonal-particle"
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              color: colorMap[theme] ?? "hsl(var(--primary))",
              "--drift": `${p.drift}px`,
            } as React.CSSProperties}
          >
            <IconComponent size={p.size} />
          </span>
        );
      })}
    </div>
  );
};

export default SeasonalDecorations;
