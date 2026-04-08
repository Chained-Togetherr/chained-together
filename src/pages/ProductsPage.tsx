import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Gem, Sparkles, Search, SlidersHorizontal } from "lucide-react";
import { products, Product, ProductVariant } from "@/lib/store";
import { useCart } from "@/contexts/CartContext";
import { useToastNotification } from "@/contexts/ToastContext";
import ProductCard from "@/components/ProductCard";
import VariantModal from "@/components/VariantModal";
import CartModal from "@/components/CartModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { addToCart, getTotalItems } = useCart();
  const { showToast } = useToastNotification();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.hasVariants) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      addToCart(product, {});
      showToast(`${product.name} ditambahkan ke keranjang!`, "success");
    }
  };

  const handleVariantConfirm = (variant: ProductVariant) => {
    if (selectedProduct) {
      addToCart(selectedProduct, variant);
      showToast(`${selectedProduct.name} ditambahkan ke keranjang!`, "success");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              "linear-gradient(155deg, hsl(345 55% 97%) 0%, hsl(275 35% 96%) 50%, hsl(38 42% 97%) 100%)",
          }}
        />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
          <motion.div
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-[5%] w-72 h-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(275 35% 85%), transparent)" }}
          />
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-5%] w-80 h-80 rounded-full opacity-35 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(345 55% 82%), transparent)" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Kembali ke Beranda
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-5">
              <span className="section-label">
                <Gem className="w-3 h-3" />
                Koleksi Lengkap
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-light text-foreground mb-4"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Semua <em>Produk</em>
            </h1>
            <p
              className="text-muted-foreground text-sm leading-relaxed mb-8"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Temukan gantungan kunci handmade yang sempurna untuk menemanimu setiap hari.
              Pilih varian favoritmu dan buat lebih spesial!
            </p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`relative max-w-sm mx-auto transition-all duration-300 ${
                isSearchFocused ? "scale-[1.02]" : "scale-100"
              }`}
            >
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200"
                style={{ color: isSearchFocused ? "hsl(var(--rose))" : "hsl(var(--muted-foreground))" }}
              />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border text-sm outline-none transition-all duration-300"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  borderColor: isSearchFocused ? "hsl(var(--rose))" : "hsl(var(--border))",
                  boxShadow: isSearchFocused
                    ? "0 0 0 3px hsl(345 55% 68% / 0.12)"
                    : "var(--shadow-subtle)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        className="border-y border-border/60 py-3"
        style={{ background: "hsl(38 42% 98%)" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "produk ditemukan" : "produk tersedia"}
            </motion.p>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Handmade &amp; Custom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "hsl(345 55% 68% / 0.08)" }}
                >
                  <Search className="w-7 h-7" style={{ color: "hsl(var(--rose))" }} />
                </div>
                <p
                  className="text-foreground font-medium mb-1"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.15rem" }}
                >
                  Produk tidak ditemukan
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Coba kata kunci yang berbeda
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center rounded-3xl p-10 md:p-14 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(345 55% 96%), hsl(275 35% 95%), hsl(38 42% 97%))",
              border: "1px solid hsl(345 55% 88% / 0.5)",
            }}
          >
            {/* Decorative bg circles */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(275 35% 78%), transparent)", transform: "translate(30%, -30%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-25 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(345 55% 80%), transparent)", transform: "translate(-30%, 30%)" }}
            />

            <div className="relative z-10">
              <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--rose))" }} />
              <h3
                className="text-3xl md:text-4xl font-light text-foreground mb-3"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Ada pertanyaan?
              </h3>
              <p
                className="text-sm text-muted-foreground mb-6 leading-relaxed"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Hubungi kami jika kamu memiliki pertanyaan tentang produk kami.
              </p>
              <motion.button
                onClick={() => { navigate("/"); setTimeout(() => document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" }), 300); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(345 55% 64%), hsl(275 35% 58%))",
                  boxShadow: "0 6px 24px -4px hsl(345 55% 68% / 0.45)",
                  fontFamily: "DM Sans, sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                Hubungi Kami
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Floating cart button (visible when cart has items) */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full text-white text-sm font-medium shadow-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(345 55% 64%), hsl(275 35% 58%))",
              boxShadow: "0 8px 32px -4px hsl(345 55% 68% / 0.55)",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Keranjang</span>
            <span
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold"
              style={{ color: "hsl(var(--rose-deep))" }}
            >
              {totalItems}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <VariantModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleVariantConfirm}
      />
    </div>
  );
};

export default ProductsPage;