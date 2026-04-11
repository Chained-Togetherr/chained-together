import React, { useEffect, useState } from "react";
import { getActiveTheme } from "@/config/theme";
import { Moon, Star, Sparkles, Heart, Snowflake, TreePine, Flag, Flower2, Leaf, Cloud, Sun, Waves, Droplets, Wind, Mountain, CloudSnow } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  iconIndex: number;
}

const themeIcons: Record<string, React.FC<{ size: number; className?: string }>[]> = {
  lebaran: [
    ({ size, className }) => <Moon size={size} className={className} />,
    ({ size, className }) => <Star size={size} className={className} />,
    ({ size, className }) => <Sparkles size={size} className={className} />,
  ],
  kemerdekaan: [
    ({ size, className }) => <Flag size={size} className={className} />,
    ({ size, className }) => <Star size={size} className={className} />,
    ({ size, className }) => <Sparkles size={size} className={className} />,
  ],
  valentine: [
    ({ size, className }) => <Heart size={size} className={className} fill="currentColor" />,
    ({ size, className }) => <Sparkles size={size} className={className} />,
    ({ size, className }) => <Star size={size} className={className} />,
  ],
  natal: [
    ({ size, className }) => <Snowflake size={size} className={className} />,
    ({ size, className }) => <TreePine size={size} className={className} />,
    ({ size, className }) => <Star size={size} className={className} />,
  ],
  semi: [
    ({ size, className }) => <Flower2 size={size} className={className} />,
    ({ size, className }) => <Leaf size={size} className={className} />,
    ({ size, className }) => <Cloud size={size} className={className} />,
  ],
  panas: [
    ({ size, className }) => <Sun size={size} className={className} />,
    ({ size, className }) => <Waves size={size} className={className} />,
    ({ size, className }) => <Droplets size={size} className={className} />,
  ],
  gugur: [
    ({ size, className }) => <Leaf size={size} className={className} />,
    ({ size, className }) => <Wind size={size} className={className} />,
    ({ size, className }) => <Cloud size={size} className={className} />,
  ],
  winter: [
    ({ size, className }) => <Snowflake size={size} className={className} />,
    ({ size, className }) => <CloudSnow size={size} className={className} />,
    ({ size, className }) => <Wind size={size} className={className} />,
    ({ size, className }) => <Mountain size={size} className={className} />,
    ({ size, className }) => <Sparkles size={size} className={className} />,
  ],
};

/* ── SVG Decorations per theme ── */
const SnowflakeSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.3" />
    <path d="M40 15l-4-5M40 15l4-5M40 65l-4 5M40 65l4 5M15 40l-5-4M15 40l-5 4M65 40l5-4M65 40l5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M22 22l-3-6M22 22l-6-3M58 22l3-6M58 22l6-3M22 58l-3 6M22 58l-6 3M58 58l3 6M58 58l6 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const IceCrystalSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,2 38,15 52,15 42,25 46,40 30,32 14,40 18,25 8,15 22,15" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.8" />
    <polygon points="30,10 35,18 45,18 37,24 40,34 30,28 20,34 23,24 15,18 25,18" fill="currentColor" opacity="0.04" />
  </svg>
);

const FrostPatternSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 Q60 30 50 50 Q40 70 50 90" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    <path d="M30 20 Q45 35 35 55 Q25 70 35 85" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
    <path d="M70 15 Q55 35 65 55 Q75 70 65 88" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
    <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.08" />
    <circle cx="35" cy="55" r="1.5" fill="currentColor" opacity="0.06" />
    <circle cx="65" cy="45" r="1.5" fill="currentColor" opacity="0.06" />
  </svg>
);

/* ── Lebaran SVGs ── */
const CrescentMoonSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="22" cy="18" r="1.5" fill="currentColor" opacity="0.1" />
    <circle cx="15" cy="30" r="1" fill="currentColor" opacity="0.08" />
  </svg>
);

const LanternSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="5" width="10" height="4" rx="1" fill="currentColor" opacity="0.08" />
    <path d="M10 12 Q10 9 15 9 H25 Q30 9 30 12 V35 Q30 42 20 45 Q10 42 10 35 Z" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
    <line x1="20" y1="45" x2="20" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
  </svg>
);

/* ── Kemerdekaan SVGs ── */
const FlagWaveSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="70" height="20" rx="2" fill="currentColor" opacity="0.08" />
    <rect x="5" y="25" width="70" height="20" rx="2" fill="currentColor" opacity="0.03" />
    <line x1="5" y1="5" x2="5" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
  </svg>
);

/* ── Valentine SVGs ── */
const HeartSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
  </svg>
);

/* ── Natal SVGs ── */
const ChristmasTreeSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,5 10,35 50,35" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
    <polygon points="30,20 5,55 55,55" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="0.6" />
    <rect x="25" y="55" width="10" height="15" rx="1" fill="currentColor" opacity="0.06" />
    <circle cx="30" cy="12" r="2" fill="currentColor" opacity="0.1" />
  </svg>
);

/* ── Semi/Spring SVGs ── */
const FlowerSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="20" r="8" fill="currentColor" opacity="0.04" />
    <circle cx="20" cy="30" r="8" fill="currentColor" opacity="0.04" />
    <circle cx="40" cy="30" r="8" fill="currentColor" opacity="0.04" />
    <circle cx="25" cy="40" r="8" fill="currentColor" opacity="0.04" />
    <circle cx="35" cy="40" r="8" fill="currentColor" opacity="0.04" />
    <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.08" />
  </svg>
);

/* ── Panas/Summer SVGs ── */
const PalmTreeSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 30 Q25 60 28 75" stroke="currentColor" strokeWidth="2" opacity="0.06" />
    <path d="M30 30 Q15 15 5 20" stroke="currentColor" strokeWidth="1.5" opacity="0.08" fill="none" />
    <path d="M30 30 Q45 15 55 20" stroke="currentColor" strokeWidth="1.5" opacity="0.08" fill="none" />
    <path d="M30 30 Q20 25 10 30" stroke="currentColor" strokeWidth="1.5" opacity="0.06" fill="none" />
    <path d="M30 30 Q40 25 50 30" stroke="currentColor" strokeWidth="1.5" opacity="0.06" fill="none" />
  </svg>
);

/* ── Gugur/Autumn SVGs ── */
const MapleLeafSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 55 L30 30 M30 30 Q15 25 10 10 Q20 18 30 15 Q40 18 50 10 Q45 25 30 30" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.8" />
    <path d="M20 35 Q10 30 8 25" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
    <path d="M40 35 Q50 30 52 25" stroke="currentColor" strokeWidth="0.6" opacity="0.06" />
  </svg>
);

/* ── Theme decoration config ── */
interface SectionDecoration {
  Component: React.FC<{ className?: string; style?: React.CSSProperties }>;
  positions: Array<{ top?: string; bottom?: string; left?: string; right?: string; width: string; opacity: number; rotate?: string }>;
}

const themeDecorations: Record<string, SectionDecoration[]> = {
  winter: [
    {
      Component: SnowflakeSVG,
      positions: [
        { top: "5%", left: "3%", width: "60px", opacity: 0.15, rotate: "15deg" },
        { top: "15%", right: "5%", width: "45px", opacity: 0.1, rotate: "-20deg" },
        { bottom: "10%", left: "8%", width: "50px", opacity: 0.12, rotate: "30deg" },
        { bottom: "20%", right: "3%", width: "40px", opacity: 0.08, rotate: "-10deg" },
      ],
    },
    {
      Component: IceCrystalSVG,
      positions: [
        { top: "30%", right: "2%", width: "55px", opacity: 0.1 },
        { bottom: "30%", left: "2%", width: "50px", opacity: 0.08 },
      ],
    },
    {
      Component: FrostPatternSVG,
      positions: [
        { top: "0%", left: "0%", width: "120px", opacity: 0.08 },
        { top: "0%", right: "0%", width: "120px", opacity: 0.08, rotate: "90deg" },
        { bottom: "0%", left: "0%", width: "100px", opacity: 0.06, rotate: "-90deg" },
        { bottom: "0%", right: "0%", width: "100px", opacity: 0.06, rotate: "180deg" },
      ],
    },
  ],
  lebaran: [
    { Component: CrescentMoonSVG, positions: [
      { top: "5%", right: "5%", width: "60px", opacity: 0.12 },
      { bottom: "15%", left: "3%", width: "50px", opacity: 0.08, rotate: "20deg" },
    ]},
    { Component: LanternSVG, positions: [
      { top: "10%", left: "5%", width: "35px", opacity: 0.1 },
      { top: "8%", right: "8%", width: "30px", opacity: 0.08 },
    ]},
  ],
  kemerdekaan: [
    { Component: FlagWaveSVG, positions: [
      { top: "5%", right: "3%", width: "70px", opacity: 0.1 },
      { bottom: "10%", left: "5%", width: "60px", opacity: 0.08, rotate: "5deg" },
    ]},
  ],
  valentine: [
    { Component: HeartSVG, positions: [
      { top: "5%", left: "5%", width: "50px", opacity: 0.1 },
      { top: "10%", right: "3%", width: "40px", opacity: 0.08, rotate: "15deg" },
      { bottom: "15%", right: "8%", width: "45px", opacity: 0.06, rotate: "-10deg" },
      { bottom: "8%", left: "3%", width: "35px", opacity: 0.07 },
    ]},
  ],
  natal: [
    { Component: ChristmasTreeSVG, positions: [
      { bottom: "5%", left: "3%", width: "50px", opacity: 0.1 },
      { bottom: "8%", right: "5%", width: "45px", opacity: 0.08 },
    ]},
    { Component: SnowflakeSVG, positions: [
      { top: "5%", left: "5%", width: "40px", opacity: 0.08 },
      { top: "8%", right: "5%", width: "35px", opacity: 0.06, rotate: "45deg" },
    ]},
  ],
  semi: [
    { Component: FlowerSVG, positions: [
      { top: "5%", left: "3%", width: "55px", opacity: 0.1 },
      { top: "10%", right: "5%", width: "45px", opacity: 0.08, rotate: "30deg" },
      { bottom: "10%", left: "5%", width: "40px", opacity: 0.06 },
    ]},
  ],
  panas: [
    { Component: PalmTreeSVG, positions: [
      { bottom: "5%", left: "2%", width: "60px", opacity: 0.1 },
      { bottom: "8%", right: "3%", width: "50px", opacity: 0.08, rotate: "-10deg" },
    ]},
  ],
  gugur: [
    { Component: MapleLeafSVG, positions: [
      { top: "5%", right: "3%", width: "50px", opacity: 0.1, rotate: "20deg" },
      { top: "15%", left: "5%", width: "40px", opacity: 0.08, rotate: "-15deg" },
      { bottom: "10%", right: "8%", width: "45px", opacity: 0.06, rotate: "40deg" },
      { bottom: "15%", left: "3%", width: "35px", opacity: 0.07, rotate: "-30deg" },
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
            className="absolute text-primary/30"
            style={{
              top: pos.top,
              bottom: pos.bottom,
              left: pos.left,
              right: pos.right,
              width: pos.width,
              height: pos.width,
              opacity: pos.opacity,
              transform: pos.rotate ? `rotate(${pos.rotate})` : undefined,
            }}
          >
            <deco.Component />
          </div>
        ))
      )}
    </div>
  );
};

const SeasonalDecorations = () => {
  const theme = getActiveTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (theme === "default") return;

    const icons = themeIcons[theme] || [];
    const count = theme === "winter" ? 24 : 18;
    const items: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: theme === "winter" ? 8 + Math.random() * 16 : 10 + Math.random() * 14,
      iconIndex: Math.floor(Math.random() * icons.length),
    }));
    setParticles(items);
  }, [theme]);

  if (theme === "default") return null;

  const icons = themeIcons[theme] || [];

  return (
    <div className="seasonal-particles pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map((p) => {
        const IconComponent = icons[p.iconIndex];
        if (!IconComponent) return null;
        return (
          <span
            key={p.id}
            className="seasonal-particle text-primary-foreground/60"
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            <IconComponent size={p.size} />
          </span>
        );
      })}
    </div>
  );
};

export default SeasonalDecorations;
