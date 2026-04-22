import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";
import { SectionDecorations } from "@/components/SeasonalDecorations";

// Import semua gambar yang tersedia
import productBunga from "@/assets/product/product-bunga.jpg";
import productCherry from "@/assets/product/product-cherry.jpg";
import productHuruf from "@/assets/product/product-huruf.jpg";
import f1 from "@/assets/product/huruf/f1.jpeg";
import f2 from "@/assets/product/huruf/f2.jpeg";
import f3 from "@/assets/product/huruf/f3.jpeg";
import f4 from "@/assets/product/huruf/f4.jpeg";
import f5 from "@/assets/product/huruf/f5.jpeg";
import f6 from "@/assets/product/huruf/f6.jpeg";

const showcaseImages = [
  { src: productBunga, alt: "Kue Bunga" },
  { src: productCherry, alt: "Kue Cherry" },
  { src: productHuruf, alt: "Kue Huruf" },
  { src: f1, alt: "Kreasi 1" },
  { src: f2, alt: "Kreasi 2" },
  { src: f3, alt: "Kreasi 3" },
  { src: f4, alt: "Kreasi 4" },
  { src: f5, alt: "Kreasi 5" },
  { src: f6, alt: "Kreasi 6" },
];

// Fisher-Yates shuffle — runs once on mount
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      scrollYRef.current = window.scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      const targetScrollY = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo({ top: targetScrollY, behavior: "instant" as ScrollBehavior });
    }
  }, [isLocked]);
};

const Showcase = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Shuffle sekali saat komponen mount
  const shuffled = useMemo(() => shuffleArray(showcaseImages), []);

  useScrollLock(selectedIndex !== null);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % shuffled.length : null
    );
  }, [shuffled.length]);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + shuffled.length) % shuffled.length : null
    );
  }, [shuffled.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSelectedIndex((p) => p !== null ? (p + 1) % shuffled.length : null);
      if (e.key === "ArrowLeft") setSelectedIndex((p) => p !== null ? (p - 1 + shuffled.length) % shuffled.length : null);
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, shuffled.length]);

  return (
    <section
      id="showcase"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Seasonal decorations */}
      <SectionDecorations section="showcase" />

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.04), transparent 80%)",
        }}
      />

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex items-center gap-1.5">
            <Camera className="w-3 h-3" />
            Momen Kami
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-5"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Karya &amp; <em>Kenangan</em>
          </h2>
          <p
            className="mt-4 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
          >
            Beberapa foto dari produk-produk kami.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {shuffled.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-border/50 relative group"
              style={{ boxShadow: "var(--shadow-subtle)" }}
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Hover overlay — kosong, hanya subtle vignette */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, hsl(var(--background) / 0.3) 0%, transparent 50%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
              background: "hsl(var(--background) / 0.92)",
              zIndex: 99999,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Backdrop blur layer */}
            <div
              className="absolute inset-0"
              style={{ backdropFilter: "blur(12px)", zIndex: -1 }}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors"
              style={{
                background: "hsl(var(--muted) / 0.7)",
                zIndex: 100001,
              }}
              aria-label="Tutup"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Prev button */}
            <button
              onClick={goPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
              style={{
                background: "hsl(var(--muted) / 0.7)",
                zIndex: 100001,
              }}
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
              style={{
                background: "hsl(var(--muted) / 0.7)",
                zIndex: 100001,
              }}
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Image */}
            <motion.div
              className="flex flex-col items-center w-full"
              style={{
                maxWidth: "min(90vw, 900px)",
                paddingTop: "env(safe-area-inset-top, 0px)",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
                zIndex: 100000,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={shuffled[selectedIndex].src}
                  alt={shuffled[selectedIndex].alt}
                  className="max-w-full rounded-2xl shadow-2xl object-contain"
                  style={{ maxHeight: "calc(100dvh - 120px)" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Counter */}
              <p
                className="text-muted-foreground mt-3 text-xs tabular-nums"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {selectedIndex + 1} / {shuffled.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Showcase;