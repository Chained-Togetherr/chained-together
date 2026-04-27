import React, { useEffect, useState, useRef } from "react";
import { getActiveTheme, ThemeName } from "@/config/theme";
import faviconUrl from "/favicon.png";

// ── SVG particle icon components ──────────────────────────────────────────────
const SvgSparkle4 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

const SvgSparkle4Outline = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

const SvgDiamond = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L22 12 L12 22 L2 12 Z" />
  </svg>
);

const SvgHexagon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" />
  </svg>
);

const SvgStar6 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1 L14 9 L22 7 L16 13 L20 21 L12 17 L4 21 L8 13 L2 7 L10 9 Z" />
  </svg>
);

const SvgCrescent = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SvgHeart = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SvgHeartOutline = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SvgSnowflake = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="12" y1="6" x2="10" y2="4" /><line x1="12" y1="6" x2="14" y2="4" />
    <line x1="12" y1="18" x2="10" y2="20" /><line x1="12" y1="18" x2="14" y2="20" />
    <line x1="6" y1="12" x2="4" y2="10" /><line x1="6" y1="12" x2="4" y2="14" />
    <line x1="18" y1="12" x2="20" y2="10" /><line x1="18" y1="12" x2="20" y2="14" />
  </svg>
);

const SvgFlower = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.5" fill={color} />
    <ellipse cx="12" cy="5" rx="2" ry="3.5" fill={color} />
    <ellipse cx="12" cy="19" rx="2" ry="3.5" fill={color} />
    <ellipse cx="5" cy="12" rx="3.5" ry="2" fill={color} />
    <ellipse cx="19" cy="12" rx="3.5" ry="2" fill={color} />
    <ellipse cx="7.2" cy="7.2" rx="2" ry="3.5" fill={color} transform="rotate(-45 7.2 7.2)" />
    <ellipse cx="16.8" cy="16.8" rx="2" ry="3.5" fill={color} transform="rotate(-45 16.8 16.8)" />
    <ellipse cx="16.8" cy="7.2" rx="2" ry="3.5" fill={color} transform="rotate(45 16.8 7.2)" />
    <ellipse cx="7.2" cy="16.8" rx="2" ry="3.5" fill={color} transform="rotate(45 7.2 16.8)" />
  </svg>
);

const SvgFlowerOutline = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="5.5" rx="1.8" ry="3" />
    <ellipse cx="12" cy="18.5" rx="1.8" ry="3" />
    <ellipse cx="5.5" cy="12" rx="3" ry="1.8" />
    <ellipse cx="18.5" cy="12" rx="3" ry="1.8" />
  </svg>
);

const SvgSun = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.4" stroke={color} />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

const SvgPentagon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L22 9 L18 21 L6 21 L2 9 Z" />
  </svg>
);

// ── Particle type key → SVG component map ────────────────────────────────────
type ParticleKey =
  | "sparkle4"
  | "sparkle4Outline"
  | "diamond"
  | "hexagon"
  | "star6"
  | "crescent"
  | "heart"
  | "heartOutline"
  | "snowflake"
  | "flower"
  | "flowerOutline"
  | "sun"
  | "pentagon";

const PARTICLE_SVG_MAP: Record<ParticleKey, React.FC<{ color: string; size: number }>> = {
  sparkle4: SvgSparkle4,
  sparkle4Outline: SvgSparkle4Outline,
  diamond: SvgDiamond,
  hexagon: SvgHexagon,
  star6: SvgStar6,
  crescent: SvgCrescent,
  heart: SvgHeart,
  heartOutline: SvgHeartOutline,
  snowflake: SvgSnowflake,
  flower: SvgFlower,
  flowerOutline: SvgFlowerOutline,
  sun: SvgSun,
  pentagon: SvgPentagon,
};

// ── Theme config ──────────────────────────────────────────────────────────────
interface ThemeConfig {
  label: string;
  bg: string;
  gradient: string;
  orb1: string;
  orb2: string;
  text: string;
  sub: string;
  accent: string;
  particles: ParticleKey[];
  particleColor: string;
  shimmer: string;
  logoRing: string;
  progressGradient: string;
  tagline: string;
}

const THEME_CONFIG: Record<ThemeName, ThemeConfig> = {
  default: {
    label: "Chained Together",
    bg: "hsl(0 0% 99%)",
    gradient: "linear-gradient(135deg, hsl(345 55% 97%) 0%, hsl(275 35% 95%) 50%, hsl(38 42% 97%) 100%)",
    orb1: "hsl(345 55% 68% / 0.18)",
    orb2: "hsl(275 40% 60% / 0.14)",
    text: "hsl(340 12% 16%)",
    sub: "hsl(340 8% 48%)",
    accent: "hsl(345 55% 68%)",
    particles: ["sparkle4", "sparkle4Outline", "diamond", "hexagon", "star6"],
    particleColor: "hsl(345 55% 68%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(345 55% 68% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(345 55% 68%), hsl(275 40% 60%), hsl(345 55% 68%))",
    progressGradient: "linear-gradient(90deg, hsl(345 55% 68%), hsl(275 40% 60%))",
    tagline: "Gantungan kunci custom & estetik",
  },
  lebaran: {
    label: "Selamat Hari Raya",
    bg: "hsl(140 15% 98%)",
    gradient: "linear-gradient(135deg, hsl(145 40% 95%) 0%, hsl(42 50% 94%) 50%, hsl(140 20% 96%) 100%)",
    orb1: "hsl(145 45% 38% / 0.15)",
    orb2: "hsl(42 60% 50% / 0.18)",
    text: "hsl(145 20% 14%)",
    sub: "hsl(145 12% 42%)",
    accent: "hsl(145 45% 38%)",
    particles: ["crescent", "sparkle4", "diamond", "sparkle4Outline", "pentagon"],
    particleColor: "hsl(42 60% 48%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(42 60% 50% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(145 45% 38%), hsl(42 60% 50%), hsl(145 45% 38%))",
    progressGradient: "linear-gradient(90deg, hsl(145 45% 38%), hsl(42 60% 50%))",
    tagline: "Rayakan keindahan bersama",
  },
  kemerdekaan: {
    label: "Dirgahayu Indonesia",
    bg: "hsl(0 0% 99%)",
    gradient: "linear-gradient(135deg, hsl(0 70% 97%) 0%, hsl(0 0% 98%) 50%, hsl(0 50% 96%) 100%)",
    orb1: "hsl(0 70% 45% / 0.18)",
    orb2: "hsl(0 0% 60% / 0.08)",
    text: "hsl(0 30% 15%)",
    sub: "hsl(0 10% 45%)",
    accent: "hsl(0 70% 45%)",
    particles: ["star6", "sparkle4", "hexagon", "diamond", "star6"],
    particleColor: "hsl(0 70% 50%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(0 70% 50% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(0 70% 45%), hsl(0 0% 85%), hsl(0 70% 45%))",
    progressGradient: "linear-gradient(90deg, hsl(0 70% 45%), hsl(0 0% 65%))",
    tagline: "Merdeka berkreasi, bebas berekspresi",
  },
  valentine: {
    label: "Happy Valentine's",
    bg: "hsl(340 30% 98%)",
    gradient: "linear-gradient(135deg, hsl(340 70% 96%) 0%, hsl(330 60% 95%) 50%, hsl(350 65% 97%) 100%)",
    orb1: "hsl(340 70% 55% / 0.18)",
    orb2: "hsl(330 60% 68% / 0.15)",
    text: "hsl(340 20% 16%)",
    sub: "hsl(340 12% 48%)",
    accent: "hsl(340 70% 55%)",
    particles: ["heart", "sparkle4", "heartOutline", "sparkle4Outline", "diamond"],
    particleColor: "hsl(340 70% 58%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(340 70% 55% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(340 70% 55%), hsl(330 60% 68%), hsl(340 70% 55%))",
    progressGradient: "linear-gradient(90deg, hsl(340 70% 55%), hsl(330 60% 68%))",
    tagline: "Ungkapkan rasa dengan sentuhan elegan",
  },
  natal: {
    label: "Merry Christmas",
    bg: "hsl(140 10% 98%)",
    gradient: "linear-gradient(135deg, hsl(0 65% 96%) 0%, hsl(140 40% 95%) 50%, hsl(42 55% 96%) 100%)",
    orb1: "hsl(0 65% 40% / 0.16)",
    orb2: "hsl(140 50% 30% / 0.15)",
    text: "hsl(0 20% 14%)",
    sub: "hsl(0 8% 42%)",
    accent: "hsl(0 65% 40%)",
    particles: ["sparkle4", "snowflake", "star6", "diamond", "sparkle4Outline"],
    particleColor: "hsl(42 60% 50%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(42 60% 50% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(0 65% 40%), hsl(140 50% 30%), hsl(42 60% 48%), hsl(0 65% 40%))",
    progressGradient: "linear-gradient(90deg, hsl(0 65% 40%), hsl(140 50% 30%))",
    tagline: "Hadirkan kebahagiaan yang berkesan",
  },
  semi: {
    label: "Welcome Spring",
    bg: "hsl(340 20% 98%)",
    gradient: "linear-gradient(135deg, hsl(340 50% 96%) 0%, hsl(140 40% 95%) 50%, hsl(50 60% 96%) 100%)",
    orb1: "hsl(340 50% 70% / 0.18)",
    orb2: "hsl(140 40% 55% / 0.14)",
    text: "hsl(340 14% 18%)",
    sub: "hsl(340 8% 45%)",
    accent: "hsl(340 50% 65%)",
    particles: ["flower", "flowerOutline", "sparkle4", "sparkle4Outline", "diamond"],
    particleColor: "hsl(340 50% 65%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(340 50% 65% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(340 50% 65%), hsl(140 40% 55%), hsl(50 60% 55%), hsl(340 50% 65%))",
    progressGradient: "linear-gradient(90deg, hsl(340 50% 65%), hsl(140 40% 55%))",
    tagline: "Mekar bersama musim semi",
  },
  panas: {
    label: "Summer Vibes",
    bg: "hsl(45 25% 98%)",
    gradient: "linear-gradient(135deg, hsl(200 55% 95%) 0%, hsl(45 60% 94%) 50%, hsl(25 45% 96%) 100%)",
    orb1: "hsl(200 70% 50% / 0.18)",
    orb2: "hsl(45 80% 55% / 0.18)",
    text: "hsl(200 20% 15%)",
    sub: "hsl(200 12% 45%)",
    accent: "hsl(200 70% 50%)",
    particles: ["sun", "sparkle4", "diamond", "hexagon", "sparkle4Outline"],
    particleColor: "hsl(45 80% 52%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(45 80% 55% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(200 70% 50%), hsl(45 80% 55%), hsl(25 75% 50%), hsl(200 70% 50%))",
    progressGradient: "linear-gradient(90deg, hsl(200 70% 50%), hsl(45 80% 55%))",
    tagline: "Segar, cerah, dan penuh warna",
  },
  gugur: {
    label: "Autumn Warmth",
    bg: "hsl(38 25% 98%)",
    gradient: "linear-gradient(135deg, hsl(25 55% 95%) 0%, hsl(15 50% 94%) 50%, hsl(40 45% 96%) 100%)",
    orb1: "hsl(25 60% 45% / 0.18)",
    orb2: "hsl(15 55% 50% / 0.16)",
    text: "hsl(25 20% 14%)",
    sub: "hsl(25 10% 42%)",
    accent: "hsl(25 60% 45%)",
    particles: ["sparkle4", "diamond", "pentagon", "hexagon", "sparkle4Outline"],
    particleColor: "hsl(15 60% 50%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(25 60% 45% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(25 60% 45%), hsl(15 55% 50%), hsl(40 55% 42%), hsl(25 60% 45%))",
    progressGradient: "linear-gradient(90deg, hsl(25 60% 45%), hsl(15 55% 50%))",
    tagline: "Kehangatan di setiap detail",
  },
  winter: {
    label: "Winter Elegance",
    bg: "hsl(210 20% 98%)",
    gradient: "linear-gradient(135deg, hsl(210 45% 95%) 0%, hsl(200 30% 95%) 50%, hsl(220 25% 96%) 100%)",
    orb1: "hsl(210 45% 55% / 0.16)",
    orb2: "hsl(200 30% 70% / 0.14)",
    text: "hsl(210 20% 16%)",
    sub: "hsl(210 10% 45%)",
    accent: "hsl(210 45% 48%)",
    particles: ["snowflake", "sparkle4", "diamond", "sparkle4Outline", "hexagon"],
    particleColor: "hsl(210 45% 55%)",
    shimmer: "linear-gradient(90deg, transparent, hsl(210 45% 55% / 0.4), transparent)",
    logoRing: "conic-gradient(from 0deg, hsl(210 45% 48%), hsl(200 30% 65%), hsl(220 35% 50%), hsl(210 45% 48%))",
    progressGradient: "linear-gradient(90deg, hsl(210 45% 48%), hsl(200 30% 65%))",
    tagline: "Keindahan yang abadi",
  },
};

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  svgKey: ParticleKey;
  opacity: number;
}

const generateParticles = (cfg: ThemeConfig, count = 18): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10 + Math.random() * 14,
    delay: Math.random() * 0.8,
    duration: 1.0 + Math.random() * 0.8,
    svgKey: cfg.particles[i % cfg.particles.length],
    opacity: 0.12 + Math.random() * 0.22,
  }));

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 3000,
}) => {
  const theme = getActiveTheme();
  const cfg = THEME_CONFIG[theme];
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "run" | "exit">("enter");
  const particles = useRef<Particle[]>(generateParticles(cfg));

  useEffect(() => {
    const enterT = setTimeout(() => setPhase("run"), 60);

    const runMs = duration - 500;
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const raw = Math.min(elapsed / runMs, 1);
      const eased = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      setProgress(eased * 100);
      if (raw < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const exitT = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => onComplete?.(), 450);
    }, duration - 450);

    return () => {
      clearTimeout(enterT);
      clearTimeout(exitT);
    };
  }, [duration, onComplete]);

  const isEntering = phase === "enter";
  const isExiting = phase === "exit";

  return (
    <>
      <style>{`
        @keyframes ls-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ls-spin-slow {
          to { transform: rotate(-360deg); }
        }
        @keyframes ls-orb-a {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(24px,-28px) scale(1.10); }
        }
        @keyframes ls-orb-b {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-18px,22px) scale(1.08); }
        }
        @keyframes ls-float {
          0%   { transform: translateY(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(-14px) rotate(10deg) scale(1.05); }
        }
        @keyframes ls-shimmer {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(300%); }
        }
        @keyframes ls-logo-pop {
          0%   { transform: scale(0.82); opacity: 0; }
          65%  { transform: scale(1.07); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes ls-pulse-glow {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.9; transform: scale(1.12); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2147483647,
          background: cfg.gradient,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          overflow: "hidden",
          transition: isExiting
            ? "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)"
            : "none",
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(1.03)" : "scale(1)",
          willChange: "opacity, transform",
        }}
      >
        {/* ── Background orbs ── */}
        <div style={{
          position: "absolute",
          width: "560px", height: "560px",
          borderRadius: "50%",
          background: cfg.orb1,
          top: "-160px", right: "-130px",
          filter: "blur(90px)",
          animation: "ls-orb-a 5s ease-in-out infinite alternate",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: cfg.orb2,
          bottom: "-110px", left: "-90px",
          filter: "blur(80px)",
          animation: "ls-orb-b 6s ease-in-out infinite alternate",
          pointerEvents: "none",
        }} />

        {/* ── Floating particles (SVG) ── */}
        {particles.current.map((p) => {
          const SvgIcon = PARTICLE_SVG_MAP[p.svgKey];
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                pointerEvents: "none",
                userSelect: "none",
                lineHeight: 1,
                opacity: phase === "run" ? p.opacity : 0,
                transition: `opacity ${p.duration}s ${p.delay * 0.5}s ease-out`,
                animation: phase === "run"
                  ? `ls-float ${1.8 + p.delay}s ${p.delay * 0.3}s ease-in-out infinite alternate`
                  : undefined,
              }}
            >
              <SvgIcon color={cfg.particleColor} size={p.size} />
            </div>
          );
        })}

        {/* ── Main content wrapper ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "22px",
            opacity: isEntering ? 0 : 1,
            transform: isEntering ? "translateY(28px) scale(0.95)" : "translateY(0) scale(1)",
            transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* ── Logo ring ── */}
          <div style={{ position: "relative", width: 108, height: 108 }}>

            {/* Pulse glow behind everything */}
            <div style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${cfg.accent}22 0%, transparent 70%)`,
              animation: "ls-pulse-glow 2.2s ease-in-out infinite",
              pointerEvents: "none",
            }} />

            {/* Outer spinning conic-gradient ring */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              padding: "3px",
              background: cfg.logoRing,
              animation: "ls-spin 2.4s linear infinite",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: cfg.bg,
              }} />
            </div>

            {/* Inner subtle counter-rotating dashed ring */}
            <div style={{
              position: "absolute",
              inset: "7px",
              borderRadius: "50%",
              border: `1.5px dashed ${cfg.accent}38`,
              animation: "ls-spin-slow 5s linear infinite",
              pointerEvents: "none",
            }} />

            {/* Favicon image — centered inside */}
            <div style={{
              position: "absolute",
              inset: "12px",
              borderRadius: "50%",
              background: `radial-gradient(circle at 38% 34%, ${cfg.orb1}, ${cfg.bg} 65%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              animation: "ls-logo-pop 0.55s 0.12s cubic-bezier(0.34,1.56,0.64,1) both",
            }}>
              <img
                src={faviconUrl}
                alt="Chained Together logo"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  display: "block",
                  userSelect: "none",
                }}
                draggable={false}
              />
            </div>
          </div>

          {/* ── Brand name ── */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.1rem)",
              fontWeight: 600,
              color: cfg.text,
              letterSpacing: "0.05em",
              lineHeight: 1,
              marginBottom: "7px",
            }}>
              Chained Together
            </div>
            <div style={{
              fontSize: "clamp(0.67rem, 1.8vw, 0.77rem)",
              color: cfg.sub,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
            }}>
              {cfg.tagline}
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div style={{
            width: "clamp(180px, 38vw, 250px)",
            height: "3px",
            borderRadius: "99px",
            background: `${cfg.accent}20`,
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              height: "100%",
              borderRadius: "99px",
              background: cfg.progressGradient,
              width: `${progress}%`,
              transition: "width 0.06s linear",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, bottom: 0,
                width: "45%",
                background: cfg.shimmer,
                animation: "ls-shimmer 1.5s ease-in-out infinite",
              }} />
            </div>
          </div>

          {/* ── Seasonal badge ── */}
          {theme !== "default" && (
            <div style={{
              padding: "4px 16px",
              borderRadius: "99px",
              background: `${cfg.accent}15`,
              border: `1px solid ${cfg.accent}28`,
              color: cfg.accent,
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              opacity: phase === "run" ? 1 : 0,
              transform: phase === "run" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.45s 0.4s ease, transform 0.45s 0.4s ease",
            }}>
              {cfg.label}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;