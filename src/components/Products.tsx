import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Gem, ArrowRight, Sparkles, Star } from "lucide-react";
import { products, formatPrice, getEffectivePrice, getDiscountPercentage } from "@/lib/store";

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="produk" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <div
          className="absolute top-10 right-[-8%] w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(275 35% 85%), transparent)" }}
        />
        <div
          className="absolute bottom-10 left-[-6%] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(345 55% 80%), transparent)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-5">
            <span className="section-label">
              <Gem className="w-3 h-3" />
              Koleksi Kami
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Produk <em>Kami</em>
          </h2>
          <p
            className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Setiap gantungan kunci dibuat dengan tangan, penuh detail dan
            ketelitian untuk momen spesialmu.
          </p>
        </motion.div>

        {/* Product preview cards — decorative, non-clickable */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative group rounded-2xl overflow-hidden bg-white border border-border/50"
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <h3
                    className="font-medium text-foreground text-sm md:text-base line-clamp-2 leading-snug mb-1"
                    style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                  >
                    {product.name}
                  </h3>
                  {product.discount && product.discountPrice ? (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] md:text-xs line-through text-muted-foreground/50"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className="text-xs md:text-sm font-semibold"
                        style={{
                          background: "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 85% 45%))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        {formatPrice(getEffectivePrice(product))}
                      </span>
                    </div>
                  ) : (
                    <span
                      className="text-xs md:text-sm font-semibold"
                      style={{
                        background: "linear-gradient(135deg, hsl(345 55% 60%), hsl(345 50% 52%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Blur / teaser overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 60%)" }}
                >
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
                    style={{
                      background: "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 56%))",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    Lihat Detail →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={() => navigate("/produk")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-medium text-sm text-white transition-all duration-300 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(345 55% 64%), hsl(275 35% 58%))",
              boxShadow: "0 8px 32px -4px hsl(345 55% 68% / 0.55), 0 2px 8px -2px hsl(275 35% 60% / 0.3)",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.04em",
              fontSize: "0.85rem",
            }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <Sparkles className="w-4 h-4" />
            Telusuri Produk Kami
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          <p
            className="text-xs text-muted-foreground/70"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Temukan koleksi lengkap dengan pilihan varian &amp; kustomisasi
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;