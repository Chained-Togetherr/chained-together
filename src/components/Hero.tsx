import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { getThemeData } from "@/config/theme";

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5Z"/>
    <path d="M5 3L5.75 5.25L8 6L5.75 6.75L5 9L4.25 6.75L2 6L4.25 5.25Z"/>
    <path d="M19 17L19.5 18.5L21 19L19.5 19.5L19 21L18.5 19.5L17 19L18.5 18.5Z"/>
  </svg>
);

const Hero = () => {
  const themeData = getThemeData();
  const scrollToProducts = () => {
    const element = document.querySelector("#produk");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0" style={{
          background: themeData.heroOverlayGradient
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, hsl(340 14% 8% / 0.35) 100%)"
        }} />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-12, 12, -12], x: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[12%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--hero-orb-1) / 0.18), transparent 70%)", filter: "blur(20px)" }}
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [6, -6, 6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--hero-orb-2) / 0.14), transparent 70%)", filter: "blur(24px)" }}
      />
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[60%] w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--hero-orb-3) / 0.12), transparent 70%)", filter: "blur(16px)" }}
      />

      {/* Fine grain texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center justify-center gap-2 mb-6 md:mb-8"
          >
            <div className="h-px w-8 md:w-10 bg-white/40" />
            <span
              className="text-white/75 tracking-[0.18em] md:tracking-[0.22em] uppercase font-medium text-center"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.65rem" }}
            >
              Aksesoris Premium Handmade
            </span>
            <div className="h-px w-8 md:w-10 bg-white/40" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-light text-white leading-[1.05] tracking-tight mb-4 md:mb-3 w-full"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2.6rem, 10vw, 5rem)",
            }}
          >
            Gantungan Kunci
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="text-white/70 mb-10 md:mb-12 leading-relaxed mx-auto text-center"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.85rem, 3.5vw, 1.05rem)",
              maxWidth: "min(90%, 480px)",
            }}
          >
            Koleksi gantungan kunci estetik dibuat dengan penuh cinta.{" "}
            Personalisasi dengan huruf dan aksesoris pilihanmu.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
          >
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300 w-full sm:w-auto"
              style={{
                background: "var(--btn-primary-gradient)",
                color: "white",
                boxShadow: "var(--btn-primary-shadow)",
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.04em",
                fontSize: "0.85rem",
                padding: "0.875rem 2rem",
                maxWidth: "260px",
              }}
            >
              <SparkleIcon />
              Lihat Koleksi
            </motion.button>

            <motion.button
              onClick={() => document.querySelector("#tentang")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide text-white/90 border border-white/25 hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
              style={{
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.04em",
                fontSize: "0.85rem",
                padding: "0.875rem 2rem",
                maxWidth: "260px",
              }}
            >
              Tentang Kami
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 md:mt-0 md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span
              className="text-white/40 uppercase"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em" }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;