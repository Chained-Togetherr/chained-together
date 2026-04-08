import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Handmade with Love",
      description: "Setiap produk dibuat dengan penuh ketelitian dan cinta, bukan produksi massal.",
    },
    {
      icon: Sparkles,
      title: "Custom Design",
      description: "Personalisasi huruf dan aksesoris sesuai keinginanmu untuk sentuhan unik.",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Material berkualitas tinggi dipilih untuk ketahanan dan keindahan yang maksimal.",
    },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "hsl(38 42% 97%)" }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(345 30% 80% / 0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(345 30% 80% / 0.4), transparent)" }} />
      </div>

      <div className="container mx-auto px-6">
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
            Kami percaya aksesoris kecil bisa membawa kebahagiaan besar — setiap produk dirancang dengan estetika modern
            dan sentuhan personal yang membuat momen harianmu lebih istimewa.
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
              className="group bg-white rounded-2xl p-7 border border-transparent hover:border-primary/15 transition-all duration-300 relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              {/* Card glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(circle at 50% 0%, hsl(345 55% 68% / 0.05), transparent 70%)" }} />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "linear-gradient(135deg, hsl(345 55% 68% / 0.12), hsl(275 35% 87% / 0.3))" }}
              >
                <feature.icon className="w-5 h-5" style={{ color: "hsl(var(--rose))" }} />
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
