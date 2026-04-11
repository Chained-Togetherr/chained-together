import React from "react";
import { motion } from "framer-motion";
import { SectionDecorations } from "@/components/SeasonalDecorations";

const HandmadeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CustomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const QualityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const About = () => {
  const features = [
    {
      icon: HandmadeIcon,
      title: "Handmade",
      description: "Setiap produk dibuat dengan tangan sendiri.",
    },
    {
      icon: CustomIcon,
      title: "Custom",
      description: "Personalisasi huruf sesuai keinginanmu untuk sentuhan unik.",
    },
    {
      icon: QualityIcon,
      title: "Quality",
      description: "Material dipilih untuk keindahan yang maksimal.",
    },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "hsl(var(--section-alt-bg))" }}>
      {/* Seasonal decorations */}
      <SectionDecorations section="tentang" />

      {/* Static decorative lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--section-line-color) / 0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--section-line-color) / 0.4), transparent)" }} />
      </div>

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="section-label mb-5 inline-block">Tentang Kami</span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 mt-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Chained <em>Together</em>
          </h2>

          <p
            className="text-muted-foreground text-sm leading-relaxed text-justify md:text-center"
            style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, lineHeight: 1.85 }}
          >
            Chained Together adalah bisnis aksesoris handmade yang berfokus pada gantungan kunci custom berkualitas tinggi.
            Kami percaya aksesoris kecil bisa membawa kebahagiaan besar. setiap produk dirancang dengan estetika dan modern
            membuat momen harianmu lebih istimewa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group bg-card rounded-2xl p-7 border border-transparent hover:border-primary/15 transition-all duration-300 relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              {/* Card glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "var(--feature-card-glow)" }} />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "var(--feature-icon-bg)" }}
              >
                <feature.icon />
              </div>

              <h3
                className="text-lg font-medium text-foreground mb-2.5"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontWeight: 500, fontSize: "1.15rem" }}
              >
                {feature.title}
              </h3>

              <p
                className="text-muted-foreground text-sm leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
