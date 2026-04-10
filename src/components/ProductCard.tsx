import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Percent } from "lucide-react";
import { Product, formatPrice, getEffectivePrice, getDiscountPercentage } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onAddToCart, index }: ProductCardProps) => {
  const isSoldOut = product.soldOut === true;
  const isLimited = product.limited === true && !isSoldOut;
  const hasDiscount = product.discount === true && !!product.discountPrice && !isSoldOut;
  const discountPercent = getDiscountPercentage(product);
  const effectivePrice = getEffectivePrice(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-primary/15 relative flex flex-col"
      style={{ boxShadow: "var(--shadow-subtle)" }}
    >
      <div className="shimmer-line" />

      <div className="relative overflow-hidden bg-[hsl(38,42%,97%)]" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={product.image}
          alt={product.name}
          className={`image-zoom w-full h-full object-cover transition-all duration-300 ${isSoldOut ? "brightness-50" : ""}`}
        />

        {!isSoldOut && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        )}

        {hasDiscount && (
          <div
            className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-white"
            style={{
              background: "linear-gradient(135deg, hsl(0 75% 55%), hsl(15 85% 50%))",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              lineHeight: 1,
              boxShadow: "0 2px 10px -1px hsl(0 75% 55% / 0.5)",
            }}
          >
            <Percent className="w-2.5 h-2.5" />
            -{discountPercent}%
          </div>
        )}

        {isLimited && (
          <div
            className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-white"
            style={{
              background: "linear-gradient(135deg, hsl(345 55% 62%), hsl(275 35% 55%))",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              lineHeight: 1,
              boxShadow: "0 2px 8px -1px hsl(345 55% 68% / 0.5)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white/80 inline-block animate-pulse" style={{ flexShrink: 0 }} />
            LIMITED
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(0.75rem, 3vw, 1rem)", fontWeight: 700, letterSpacing: "0.12em", color: "hsl(0, 85%, 55%)", textShadow: "0 1px 4px rgba(0,0,0,0.6)", userSelect: "none" }}>
              SOLD OUT
            </span>
          </div>
        )}

        {!isSoldOut && (
          <div className="absolute bottom-3 left-0 right-0 hidden sm:flex justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-medium tracking-wide shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 56%))", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.05em", boxShadow: "var(--shadow-button)" }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Tambah ke Keranjang
            </motion.button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.35 }}
        >
          {product.name}
        </h3>

        {product.hasVariants && !isSoldOut && (
          <p className="text-[10px] text-muted-foreground/60 mb-3 tracking-wide uppercase" style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.09em" }}>
            Pilih Varian
          </p>
        )}

        {/* Desktop price */}
        <div className="hidden sm:flex items-center justify-between mt-auto pt-2">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-xs line-through text-muted-foreground/60" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {formatPrice(product.price)}
                </span>
                <span className="font-semibold text-base" style={{ background: "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 85% 45%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "DM Sans, sans-serif" }}>
                  {formatPrice(effectivePrice)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-base" style={{ background: isSoldOut ? "none" : "linear-gradient(135deg, hsl(345 55% 60%), hsl(345 50% 52%))", WebkitBackgroundClip: isSoldOut ? "unset" : "text", WebkitTextFillColor: isSoldOut ? "hsl(0 0% 60%)" : "transparent", color: isSoldOut ? "hsl(0 0% 60%)" : undefined, fontFamily: "DM Sans, sans-serif", textDecoration: isSoldOut ? "line-through" : "none" }}>
                {formatPrice(product.price)}
              </span>
            )}
            {product.bellOption && !isSoldOut && (
              <span className="block text-[9px] text-muted-foreground/55 mt-0.5" style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.04em" }}>
                + lonceng tersedia
              </span>
            )}
          </div>

          {!isSoldOut ? (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }} onClick={() => onAddToCart(product)} className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200" style={{ background: "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))", boxShadow: "0 3px 12px -2px hsl(345 55% 68% / 0.45)" }} title="Tambah ke keranjang">
              <Plus className="w-4 h-4 text-white" />
            </motion.button>
          ) : (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border" style={{ fontFamily: "DM Sans, sans-serif", color: "hsl(0, 70%, 55%)", borderColor: "hsl(0, 70%, 55%)", fontSize: "0.65rem", letterSpacing: "0.06em" }}>
              Habis
            </span>
          )}
        </div>

        {/* Mobile price */}
        <div className="sm:hidden mt-auto pt-2">
          {hasDiscount ? (
            <div className="flex flex-col mb-3">
              <span className="text-xs line-through text-muted-foreground/60" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {formatPrice(product.price)}
              </span>
              <span className="font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 85% 45%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "DM Sans, sans-serif" }}>
                {formatPrice(effectivePrice)}
              </span>
            </div>
          ) : (
            <span className="block font-semibold text-lg mb-3" style={{ background: isSoldOut ? "none" : "linear-gradient(135deg, hsl(345 55% 60%), hsl(345 50% 52%))", WebkitBackgroundClip: isSoldOut ? "unset" : "text", WebkitTextFillColor: isSoldOut ? "hsl(0 0% 60%)" : "transparent", color: isSoldOut ? "hsl(0 0% 60%)" : undefined, fontFamily: "DM Sans, sans-serif", textDecoration: isSoldOut ? "line-through" : "none" }}>
              {formatPrice(product.price)}
            </span>
          )}

          {!isSoldOut ? (
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(product)} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300" style={{ background: "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))", fontFamily: "DM Sans, sans-serif", boxShadow: "var(--shadow-button)" }}>
              <ShoppingBag className="w-4 h-4" />
              Tambah
            </motion.button>
          ) : (
            <div className="flex items-center justify-center w-full py-2.5 rounded-full border text-sm font-medium" style={{ fontFamily: "DM Sans, sans-serif", color: "hsl(0, 70%, 55%)", borderColor: "hsl(0, 70%, 55% / 0.4)", background: "hsl(0, 70%, 97%)", letterSpacing: "0.04em" }}>
              Stok Habis
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
