import React, { useEffect, useState, useMemo } from "react";
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
   PARTICLE ICONS — simplified paths, no redundant attrs
   ══════════════════════════════════════════════════ */
const MoonSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10"/>
  </svg>
);
const StarSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 14.5,9 22,9 16,13.5 18,21 12,16.5 6,21 8,13.5 2,9 9.5,9"/>
  </svg>
);
const LanternSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 60" fill="currentColor">
    <path d="M10 12 Q10 9 16 9 H24 Q30 9 30 12 V35 Q30 42 20 46 Q10 42 10 35 Z" opacity="0.8"/>
  </svg>
);
const KetupaSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 60" fill="currentColor">
    <rect x="10" y="15" width="30" height="30" rx="3" opacity="0.7" transform="rotate(45 25 30)"/>
  </svg>
);
const FlagSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 70 50" fill="currentColor">
    <rect x="6" y="6" width="58" height="19" rx="2" opacity="0.9"/>
    <rect x="6" y="25" width="58" height="19" rx="2" opacity="0.3"/>
  </svg>
);
const StarBurstSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <circle cx="30" cy="30" r="10" opacity="0.5"/>
    <path d="M30 5L30 55M5 30L55 30M11 11L49 49M49 11L11 49" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);
const HeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z"/>
  </svg>
);
const SparkSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.5 8L19 8L14.5 11.5L16.5 17.5L12 14L7.5 17.5L9.5 11.5L5 8L10.5 8Z"/>
  </svg>
);
const TreeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 80" fill="currentColor">
    <polygon points="30,5 12,32 48,32" opacity="0.85"/>
    <polygon points="30,22 7,54 53,54" opacity="0.75"/>
    <rect x="24" y="54" width="12" height="16" rx="1.5" opacity="0.65"/>
  </svg>
);
const SnowflakeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.5"/>
  </svg>
);
const FlowerSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <circle cx="30" cy="18" r="10" opacity="0.55"/>
    <circle cx="18" cy="32" r="10" opacity="0.55"/>
    <circle cx="42" cy="32" r="10" opacity="0.55"/>
    <circle cx="30" cy="32" r="6" opacity="0.95"/>
  </svg>
);
const CherryBlossomSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="currentColor">
    <ellipse cx="25" cy="12" rx="7" ry="10" opacity="0.7"/>
    <ellipse cx="38" cy="20" rx="7" ry="10" opacity="0.7" transform="rotate(72 38 20)"/>
    <ellipse cx="17" cy="36" rx="7" ry="10" opacity="0.7" transform="rotate(216 17 36)"/>
    <circle cx="25" cy="25" r="4"/>
  </svg>
);
const SunSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <circle cx="30" cy="30" r="12"/>
    <path d="M30 5L30 13M30 47L30 55M5 30L13 30M47 30L55 30M11 11L17 17M43 43L49 49M49 11L43 17M17 43L11 49" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);
const MapleLeafSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor">
    <path d="M30 55 L30 30 M30 30 Q14 24 9 9 Q20 18 30 15 Q40 18 51 9 Q46 24 30 30" opacity="0.9"/>
  </svg>
);
const AcornSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 60" fill="currentColor">
    <ellipse cx="20" cy="35" rx="12" ry="16" opacity="0.75"/>
    <path d="M8 28 Q20 20 32 28" opacity="0.9"/>
  </svg>
);
const BigSnowflakeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.5"/>
  </svg>
);

type SvgIconComponent = React.FC<{ size: number }>;

const themeParticleIcons: Record<string, SvgIconComponent[]> = {
  lebaran:     [MoonSVG, StarSVG, LanternSVG, KetupaSVG],
  kemerdekaan: [FlagSVG, StarSVG, StarBurstSVG],
  valentine:   [HeartSVG, SparkSVG, HeartSVG],
  natal:       [SnowflakeSVG, TreeSVG, StarSVG],
  semi:        [FlowerSVG, CherryBlossomSVG, FlowerSVG],
  panas:       [SunSVG, SunSVG, StarSVG],
  gugur:       [MapleLeafSVG, AcornSVG, MapleLeafSVG],
  winter:      [BigSnowflakeSVG, SnowflakeSVG, BigSnowflakeSVG],
};

/* ══════════════════════════════════════════════════
   SECTION DECORATION SVGs — reduced, no heavy filters
   ══════════════════════════════════════════════════ */

const DecoSnowflake = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 80 80" fill="none">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.3"/>
  </svg>
);
const DecoCrescent = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10" fill="currentColor" opacity="0.07"/>
  </svg>
);
const DecoLantern = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 40 60" fill="none">
    <path d="M10 12 Q10 9 15 9 H25 Q30 9 30 12 V35 Q30 42 20 45 Q10 42 10 35 Z" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoStarOrnament = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 50 50" fill="none">
    <path d="M25 5 L28 18 L42 18 L31 26 L35 40 L25 32 L15 40 L19 26 L8 18 L22 18 Z" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoFlag = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 80 50" fill="none">
    <rect x="5" y="5" width="70" height="20" rx="2" fill="currentColor" opacity="0.07"/>
    <rect x="5" y="25" width="70" height="20" rx="2" fill="currentColor" opacity="0.025"/>
  </svg>
);
const DecoGarung = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 5 L33 18 L46 18 L36 26 L40 40 L30 32 L20 40 L24 26 L14 18 L27 18 Z" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoHeart = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoTree = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 80" fill="none">
    <polygon points="30,5 12,32 48,32" fill="currentColor" opacity="0.055"/>
    <polygon points="30,22 7,54 53,54" fill="currentColor" opacity="0.045"/>
    <rect x="24" y="54" width="12" height="16" rx="1.5" fill="currentColor" opacity="0.06"/>
  </svg>
);
const DecoFlower = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="18" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="18" cy="32" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="42" cy="32" r="10" fill="currentColor" opacity="0.055"/>
    <circle cx="30" cy="32" r="6" fill="currentColor" opacity="0.1"/>
  </svg>
);
const DecoSun = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.1"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.18"/>
    <path d="M50 8L50 18M50 82L50 92M8 50L18 50M82 50L92 50M19 19L26 26M74 74L81 81M81 19L74 26M26 74L19 81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.18"/>
  </svg>
);
const DecoMapleLeaf = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <path d="M30 55 L30 30 M30 30 Q14 24 9 9 Q20 18 30 15 Q40 18 51 9 Q46 24 30 30" fill="currentColor" opacity="0.065"/>
  </svg>
);
const DecoIceCrystal = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 60" fill="none">
    <polygon points="30,4 36,20 54,20 40,30 46,47 30,37 14,47 20,30 6,20 24,20" fill="currentColor" opacity="0.06"/>
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

// Reduced decoration counts — max 4 per theme (down from 10-15)
const themeDecorations: Record<string, SectionDecoration[]> = {
  winter: [
    { Component: DecoSnowflake, positions: [
      { top: "3%",  left: "2%",  width: "72px", opacity: 0.18, rotate: "12deg" },
      { top: "10%", right: "3%", width: "52px", opacity: 0.14, rotate: "-22deg" },
      { bottom: "7%", left: "5%", width: "60px", opacity: 0.15, rotate: "35deg" },
      { top: "42%", right: "1%", width: "42px", opacity: 0.09, rotate: "-40deg" },
    ]},
    { Component: DecoIceCrystal, positions: [
      { top: "28%",    right: "2%", width: "64px", opacity: 1.0 },
      { bottom: "28%", left: "2%",  width: "58px", opacity: 1.0 },
    ]},
  ],
  lebaran: [
    { Component: DecoCrescent, positions: [
      { top: "3%",  right: "4%", width: "75px", opacity: 0.16 },
      { bottom: "10%", left: "3%", width: "60px", opacity: 0.11, rotate: "18deg" },
    ]},
    { Component: DecoLantern, positions: [
      { top: "6%",  left: "5%",  width: "42px", opacity: 1.0 },
      { bottom: "18%", right: "4%", width: "38px", opacity: 1.0 },
    ]},
    { Component: DecoStarOrnament, positions: [
      { top: "35%", right: "5%", width: "44px", opacity: 1.0 },
      { bottom: "35%", left: "5%", width: "38px", opacity: 1.0, rotate: "20deg" },
    ]},
  ],
  kemerdekaan: [
    { Component: DecoFlag, positions: [
      { top: "4%",  right: "3%", width: "85px", opacity: 1.0 },
      { bottom: "6%", left: "4%", width: "72px", opacity: 1.0, rotate: "4deg" },
    ]},
    { Component: DecoGarung, positions: [
      { top: "12%", left: "6%",  width: "50px", opacity: 1.0, rotate: "10deg" },
      { bottom: "20%", right: "5%", width: "40px", opacity: 1.0, rotate: "-30deg" },
    ]},
  ],
  valentine: [
    { Component: DecoHeart, positions: [
      { top: "3%",  left: "4%",  width: "65px", opacity: 0.14 },
      { top: "7%",  right: "3%", width: "52px", opacity: 0.10, rotate: "15deg" },
      { bottom: "10%", right: "6%", width: "58px", opacity: 0.09, rotate: "-12deg" },
      { top: "40%", left: "1%", width: "38px", opacity: 0.08, rotate: "20deg" },
    ]},
  ],
  natal: [
    { Component: DecoTree, positions: [
      { bottom: "4%",  left: "2%",  width: "60px", opacity: 0.14 },
      { bottom: "5%",  right: "4%", width: "54px", opacity: 0.11 },
    ]},
    { Component: DecoSnowflake, positions: [
      { top: "3%",  left: "4%",  width: "48px", opacity: 0.12, rotate: "20deg" },
      { top: "7%",  right: "4%", width: "40px", opacity: 0.09, rotate: "48deg" },
      { top: "40%", right: "2%", width: "42px", opacity: 0.08, rotate: "-30deg" },
    ]},
  ],
  semi: [
    { Component: DecoFlower, positions: [
      { top: "3%",  left: "2%",  width: "68px", opacity: 0.13 },
      { top: "7%",  right: "4%", width: "56px", opacity: 0.10, rotate: "30deg" },
      { bottom: "7%",  left: "4%", width: "52px", opacity: 0.09 },
      { top: "42%", right: "1%", width: "38px", opacity: 0.07, rotate: "-25deg" },
    ]},
  ],
  panas: [
    { Component: DecoSun, positions: [
      { top: "1%",  right: "3%",  width: "120px", opacity: 1.0 },
      { bottom: "4%", left: "2%", width: "85px",  opacity: 1.0, rotate: "20deg" },
    ]},
  ],
  gugur: [
    { Component: DecoMapleLeaf, positions: [
      { top: "3%",     right: "3%", width: "62px", opacity: 0.14, rotate: "22deg" },
      { top: "10%",    left: "4%",  width: "52px", opacity: 0.11, rotate: "-18deg" },
      { bottom: "7%",  right: "6%", width: "56px", opacity: 0.10, rotate: "42deg" },
      { top: "38%",   right: "1%", width: "38px", opacity: 0.08, rotate: "55deg" },
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
   FLOATING PARTICLES — heavily reduced counts
   ══════════════════════════════════════════════════ */
const SeasonalDecorations = () => {
  const theme = getActiveTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Reduced particle counts drastically for mobile performance
  const particleCounts: Record<string, number> = useMemo(() => ({
    winter: 10, panas: 8, natal: 9, semi: 8, gugur: 8, valentine: 8, lebaran: 7, kemerdekaan: 7,
  }), []);

  useEffect(() => {
    if (theme === "default") return;
    const icons = themeParticleIcons[theme] || [];
    const count = particleCounts[theme] ?? 8;
    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 8,
      size: 10 + Math.random() * 12,
      iconIndex: Math.floor(Math.random() * icons.length),
      drift: (Math.random() - 0.5) * 40,
    }));
    setParticles(items);
  }, [theme, particleCounts]);

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
    <div
      className="seasonal-particles pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 9999, contain: "strict" }}
    >
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