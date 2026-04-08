import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
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
          background: "linear-gradient(155deg, hsl(345 55% 30% / 0.82) 0%, hsl(275 40% 28% / 0.78) 45%, hsl(345 50% 24% / 0.88) 100%)"
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
        style={{ background: "radial-gradient(circle, hsl(345 55% 68% / 0.18), transparent 70%)", filter: "blur(20px)" }}
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [6, -6, 6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(275 40% 60% / 0.14), transparent 70%)", filter: "blur(24px)" }}
      />
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[60%] w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(345 60% 80% / 0.12), transparent 70%)", filter: "blur(16px)" }}
      />

      {/* Fine grain texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="h-px w-10 bg-white/40" />
            <span className="text-white/75 text-xs tracking-[0.22em] uppercase font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Aksesoris Premium Handmade
            </span>
            <div className="h-px w-10 bg-white/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 leading-[1.05] tracking-tight"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Gantungan Kunci
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold italic mb-8 leading-[1.05]"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              background: "linear-gradient(135deg, #ffd6e0, #f0c4d4, #e8bde0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Custom & Estetik
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="text-white/70 text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          >
            Koleksi gantungan kunci estetik dibuat dengan penuh cinta. 
            Personalisasi dengan huruf dan aksesoris pilihanmu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(345 55% 68%), hsl(275 35% 60%))",
                color: "white",
                boxShadow: "0 8px 32px -4px hsl(345 55% 68% / 0.5)",
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Lihat Koleksi
            </motion.button>

            <motion.button
              onClick={() => document.querySelector("#tentang")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white/90 border border-white/25 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.04em" }}
            >
              Tentang Kami
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.65rem" }}>Scroll</span>
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
