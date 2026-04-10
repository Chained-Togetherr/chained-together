import React, { useEffect, useState } from "react";
import { getActiveTheme } from "@/config/theme";
import { Moon, Star, Sparkles, Heart, Snowflake, TreePine, Flag, Flower2, Leaf, Cloud, Sun, Waves, Droplets, Wind } from "lucide-react";

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
};

const SeasonalDecorations = () => {
  const theme = getActiveTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (theme === "default") return;

    const icons = themeIcons[theme] || [];
    const items: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 10 + Math.random() * 14,
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
