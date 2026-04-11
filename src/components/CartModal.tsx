import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToastNotification } from "@/contexts/ToastContext";
import { formatPrice, generateWhatsAppMessage, WHATSAPP_NUMBER, getEffectivePrice, getDiscountPercentage } from "@/lib/store";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { getActiveTheme } from "@/config/theme";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeEmojis: Record<string, string[]> = {
  lebaran: ["🌙", "⭐", "✨"],
  kemerdekaan: ["🇮🇩", "⭐", "🎆"],
  valentine: ["💕", "💗", "✨"],
  natal: ["🎄", "⭐", "❄️"],
  semi: ["🌸", "🌿", "🦋"],
  panas: ["☀️", "🌊", "🏖️"],
  gugur: ["🍂", "🍁", "🌾"],
  winter: ["❄️", "⛄", "🌨️"],
  default: ["✿", "✨", "♡"],
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { showToast } = useToastNotification();
  const activeTheme = getActiveTheme();
  const emojis = themeEmojis[activeTheme] || themeEmojis.default;

  useScrollLock(isOpen);

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Keranjang masih kosong!", "error");
      return;
    }
    const message = generateWhatsAppMessage(cart);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    clearCart();
    onClose();
    showToast("Pesanan dikirim ke WhatsApp!", "success");
  };

  const handleRemove = (productId: number, variant: any, productName: string) => {
    removeFromCart(productId, variant);
    showToast(`${productName} dihapus dari keranjang`, "info");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 10001 }}
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md shadow-2xl flex flex-col overflow-hidden"
            style={{ zIndex: 10002, background: "hsl(var(--modal-bg))" }}
          >
            {/* Theme floating decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              {emojis.map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute opacity-[0.07]"
                  style={{
                    top: `${15 + i * 28}%`,
                    right: `${5 + i * 10}%`,
                    fontSize: "2rem",
                  }}
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  {emoji}
                </motion.div>
              ))}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-[0.06] blur-3xl"
                style={{ background: "hsl(var(--modal-decoration-1))" }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-[0.05] blur-3xl"
                style={{ background: "hsl(var(--modal-decoration-2))" }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0 relative"
              style={{ background: "var(--modal-header-gradient)", zIndex: 1 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "hsl(var(--modal-accent-bg) / 0.12)" }}
                >
                  <ShoppingBag className="w-4 h-4" style={{ color: "hsl(var(--modal-accent-bg))" }} />
                </div>
                <h2
                  className="text-xl text-foreground font-medium"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.35rem" }}
                >
                  Keranjang
                </h2>
                {cart.length > 0 && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "hsl(var(--modal-accent-bg))",
                      color: "hsl(var(--primary-foreground))",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5 relative" style={{ zIndex: 1 }}>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(var(--modal-accent-bg) / 0.08)" }}
                  >
                    <ShoppingBag className="w-8 h-8" style={{ color: "hsl(var(--modal-accent-bg))" }} />
                  </div>
                  <p className="text-foreground font-medium text-sm" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}>
                    Keranjang masih kosong
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Yuk, tambahkan produk favoritmu!
                  </p>
                  <div className="mt-4 flex gap-2 opacity-30">
                    {emojis.map((e, i) => <span key={i} className="text-2xl">{e}</span>)}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.variant.letter}-${item.variant.hasBell}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="flex gap-4 p-4 rounded-2xl border border-border/60"
                      style={{ background: "hsl(var(--modal-item-bg))" }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="rounded-xl object-cover flex-shrink-0"
                        style={{ width: "72px", height: "72px" }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-medium text-foreground truncate"
                          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1rem" }}
                        >
                          {item.product.name}
                        </h4>
                        {item.product.discount && item.product.discountPrice && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full w-fit"
                            style={{
                              background: "var(--price-gradient-discount)",
                              color: "hsl(var(--primary-foreground))",
                              fontFamily: "DM Sans, sans-serif",
                            }}
                          >
                            -{getDiscountPercentage(item.product)}%
                          </span>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.variant.letter && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: "hsl(var(--modal-badge-letter-bg) / 0.10)",
                                color: "hsl(var(--modal-badge-letter-bg))",
                                fontFamily: "DM Sans, sans-serif",
                                letterSpacing: "0.04em",
                              }}
                            >
                              Huruf: {item.variant.letter}
                            </span>
                          )}
                          {item.variant.hasBell && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: "hsl(var(--modal-badge-bell-bg) / 0.5)",
                                color: "hsl(var(--modal-badge-bell-text))",
                                fontFamily: "DM Sans, sans-serif",
                              }}
                            >
                              + Lonceng
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                              style={{ background: "hsl(var(--modal-bg))" }}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-medium text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                              style={{ background: "hsl(var(--modal-bg))" }}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.product.id, item.variant, item.product.name)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/8 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.product.discount && item.product.discountPrice ? (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs line-through text-muted-foreground/50" style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {formatPrice(
                                (item.product.price + (item.variant.hasBell && item.product.bellPrice ? item.product.bellPrice : 0)) * item.quantity
                              )}
                            </span>
                            <span
                              className="font-semibold text-sm"
                              style={{
                                background: "var(--price-gradient-discount)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontFamily: "DM Sans, sans-serif",
                              }}
                            >
                              {formatPrice(item.totalPrice)}
                            </span>
                          </div>
                        ) : (
                          <p
                            className="mt-2 font-semibold text-sm"
                            style={{
                              background: "var(--price-gradient)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              fontFamily: "DM Sans, sans-serif",
                            }}
                          >
                            {formatPrice(item.totalPrice)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="px-6 py-5 border-t border-border flex-shrink-0 relative"
                style={{ background: "hsl(var(--modal-item-bg))", zIndex: 1 }}
              >
                {/* Theme accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(var(--modal-accent-bg) / 0.3), transparent)` }}
                />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Total Pembayaran
                  </span>
                  <span
                    className="text-2xl font-semibold"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      background: "var(--price-gradient)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-medium text-sm transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #25d366, #128c7e)",
                    color: "#fff",
                    boxShadow: "0 4px 20px -4px rgba(37, 211, 102, 0.45)",
                    fontFamily: "DM Sans, sans-serif",
                    letterSpacing: "0.03em",
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Checkout via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;