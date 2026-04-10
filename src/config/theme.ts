export const seasonalThemes = {
  temaLebaran: false,       // Lebaran
  temaKemerdekaan: false,   // HUT RI
  temaValentine: false,     // Valentine
  temaNatal: false,         // Natal
  temaSemi: false,           // Spring
  temaPanas: true,         // Summer
  temaGugur: false,         // Autumn
} as const;

export type ThemeName = "lebaran" | "kemerdekaan" | "valentine" | "natal" | "semi" | "panas" | "gugur" | "default";

export function getActiveTheme(): ThemeName {
  if (seasonalThemes.temaLebaran) return "lebaran";
  if (seasonalThemes.temaKemerdekaan) return "kemerdekaan";
  if (seasonalThemes.temaValentine) return "valentine";
  if (seasonalThemes.temaNatal) return "natal";
  if (seasonalThemes.temaSemi) return "semi";
  if (seasonalThemes.temaPanas) return "panas";
  if (seasonalThemes.temaGugur) return "gugur";
  return "default";
}

export interface ThemeData {
  name: ThemeName;
  cssClass: string;
  heroOverlayGradient: string;
}

export const themeDataMap: Record<ThemeName, ThemeData> = {
  default: {
    name: "default",
    cssClass: "",
    heroOverlayGradient: "linear-gradient(155deg, hsl(345 55% 30% / 0.82) 0%, hsl(275 40% 28% / 0.78) 45%, hsl(345 50% 24% / 0.88) 100%)",
  },
  lebaran: {
    name: "lebaran",
    cssClass: "theme-lebaran",
    heroOverlayGradient: "linear-gradient(155deg, hsl(145 50% 22% / 0.85) 0%, hsl(42 70% 35% / 0.75) 50%, hsl(145 45% 18% / 0.88) 100%)",
  },
  kemerdekaan: {
    name: "kemerdekaan",
    cssClass: "theme-kemerdekaan",
    heroOverlayGradient: "linear-gradient(155deg, hsl(0 70% 30% / 0.85) 0%, hsl(0 0% 95% / 0.15) 50%, hsl(0 70% 28% / 0.88) 100%)",
  },
  valentine: {
    name: "valentine",
    cssClass: "theme-valentine",
    heroOverlayGradient: "linear-gradient(155deg, hsl(340 70% 30% / 0.85) 0%, hsl(330 60% 40% / 0.78) 50%, hsl(350 65% 28% / 0.88) 100%)",
  },
  natal: {
    name: "natal",
    cssClass: "theme-natal",
    heroOverlayGradient: "linear-gradient(155deg, hsl(0 65% 28% / 0.85) 0%, hsl(140 50% 20% / 0.78) 50%, hsl(42 60% 30% / 0.70) 100%)",
  },
  semi: {
    name: "semi",
    cssClass: "theme-semi",
    heroOverlayGradient: "linear-gradient(155deg, hsl(340 50% 70% / 0.75) 0%, hsl(140 40% 55% / 0.65) 50%, hsl(50 60% 65% / 0.70) 100%)",
  },
  panas: {
    name: "panas",
    cssClass: "theme-panas",
    heroOverlayGradient: "linear-gradient(155deg, hsl(200 70% 40% / 0.80) 0%, hsl(45 80% 50% / 0.70) 50%, hsl(25 75% 45% / 0.75) 100%)",
  },
  gugur: {
    name: "gugur",
    cssClass: "theme-gugur",
    heroOverlayGradient: "linear-gradient(155deg, hsl(25 60% 30% / 0.85) 0%, hsl(15 55% 35% / 0.78) 50%, hsl(40 50% 28% / 0.82) 100%)",
  },
};

export function getThemeData(): ThemeData {
  return themeDataMap[getActiveTheme()];
}
