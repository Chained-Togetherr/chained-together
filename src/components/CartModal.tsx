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

/* ── SVG icon components per theme ── */
type SvgIconProps = { size?: number; style?: React.CSSProperties };

const ThemeIconsMap: Record<string, React.FC<SvgIconProps>[]> = {
  lebaran: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M35 10 A20 20 0 1 0 35 50 A15 15 0 1 1 35 10" fill="currentColor" stroke="currentColor" strokeWidth="0.8"/>
        <circle cx="22" cy="18" r="2" fill="currentColor"/>
        <circle cx="15" cy="30" r="1.5" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 40 60" fill="none" style={style}>
        <rect x="15" y="5" width="10" height="4" rx="1" fill="currentColor" opacity="0.8"/>
        <path d="M10 12 Q10 9 15 9 H25 Q30 9 30 12 V35 Q30 42 20 45 Q10 42 10 35 Z" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="20" y1="45" x2="20" y2="55" stroke="currentColor" strokeWidth="1.2" opacity="0.7"/>
      </svg>
    ),
  ],
  kemerdekaan: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 80 50" fill="none" style={style}>
        <rect x="5" y="5" width="70" height="20" rx="2" fill="currentColor" opacity="0.9"/>
        <rect x="5" y="25" width="70" height="20" rx="2" fill="currentColor" opacity="0.25"/>
        <line x1="5" y1="5" x2="5" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="30" r="12" fill="currentColor" opacity="0.3"/>
        <path d="M30 5 L30 15 M30 45 L30 55 M5 30 L15 30 M45 30 L55 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
      </svg>
    ),
  ],
  valentine: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
        <path d="M20 34 C6 24 0 14 10 8 C14 5 17 7 20 12 C23 7 26 5 30 8 C40 14 34 24 20 34Z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
        <path d="M12 3 L13.5 8 L18.5 8 L14.5 11 L16 16 L12 13 L8 16 L9.5 11 L5.5 8 L10.5 8 Z" fill="currentColor"/>
        <circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="19" cy="19" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  ],
  natal: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 80" fill="none" style={style}>
        <polygon points="30,5 10,35 50,35" fill="currentColor" opacity="0.8"/>
        <polygon points="30,20 5,55 55,55" fill="currentColor" opacity="0.7"/>
        <rect x="25" y="55" width="10" height="15" rx="1" fill="currentColor" opacity="0.6"/>
        <circle cx="30" cy="12" r="2.5" fill="currentColor"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
        <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.3"/>
        <path d="M30 5 L30 55 M5 30 L55 30 M10 10 L50 50 M50 10 L10 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  ],
  semi: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="20" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="32" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="40" cy="32" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="25" cy="42" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="35" cy="42" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="30" cy="31" r="5" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M30 55 L30 25 M30 25 Q15 20 10 8 Q20 15 30 12 Q40 15 50 8 Q45 20 30 25" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="0.8"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M10 40 Q20 20 30 15 Q40 20 50 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <ellipse cx="30" cy="13" rx="8" ry="5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  ],
  panas: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="30" r="11" fill="currentColor" opacity="0.9"/>
        <path d="M30 5 L30 12 M30 48 L30 55 M5 30 L12 30 M48 30 L55 30 M11 11 L16 16 M44 44 L49 49 M49 11 L44 16 M16 44 L11 49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 80 40" fill="none" style={style}>
        <path d="M5 30 Q20 10 35 25 Q50 10 65 25 Q80 10 85 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
        <path d="M5 38 Q20 18 35 33 Q50 18 65 33 Q80 18 85 28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 80" fill="none" style={style}>
        <path d="M30 30 Q25 60 28 75" stroke="currentColor" strokeWidth="2.5" opacity="0.7"/>
        <path d="M30 30 Q15 15 5 20" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
        <path d="M30 30 Q45 15 55 20" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
        <path d="M30 30 Q18 22 8 28" stroke="currentColor" strokeWidth="1.8" opacity="0.6"/>
        <path d="M30 30 Q42 22 52 28" stroke="currentColor" strokeWidth="1.8" opacity="0.6"/>
      </svg>
    ),
  ],
  gugur: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M30 55 L30 30 M30 30 Q15 25 10 10 Q20 18 30 15 Q40 18 50 10 Q45 25 30 30" fill="currentColor" opacity="0.85"/>
        <path d="M20 38 Q10 33 8 25" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
        <path d="M40 38 Q50 33 52 25" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M10 20 Q25 15 30 30 Q35 15 50 20" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.4" opacity="0.7"/>
        <line x1="30" y1="33" x2="30" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 40" fill="none" style={style}>
        <path d="M5 20 Q15 8 30 15 Q45 8 55 15 Q50 30 30 25 Q10 30 5 20Z" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="0.8"/>
      </svg>
    ),
  ],
  winter: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
        <path d="M40 5v70M5 40h70M15 15l50 50M65 15L15 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.4"/>
        <path d="M40 15l-5-6M40 15l5-6M40 65l-5 6M40 65l5 6M15 40l-6-5M15 40l-6 5M65 40l6-5M65 40l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="20" r="12" fill="currentColor" opacity="0.3"/>
        <ellipse cx="30" cy="45" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
        <circle cx="24" cy="22" r="2" fill="currentColor" opacity="0.5"/>
        <circle cx="36" cy="22" r="2" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M30 5 Q35 15 30 25 Q25 35 30 45 Q35 50 30 55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="30" cy="15" r="2" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="35" r="1.5" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  ],
  default: [
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <circle cx="30" cy="20" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="32" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="40" cy="32" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="25" cy="42" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="35" cy="42" r="9" fill="currentColor" opacity="0.5"/>
        <circle cx="30" cy="31" r="5" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
        <path d="M12 3 L13.5 8 L18.5 8 L14.5 11 L16 16 L12 13 L8 16 L9.5 11 L5.5 8 L10.5 8 Z" fill="currentColor"/>
      </svg>
    ),
    ({ size = 28, style }) => (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
        <path d="M30 50 C10 35 0 20 15 12 C22 8 28 12 30 18 C32 12 38 8 45 12 C60 20 50 35 30 50Z" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  ],
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { showToast } = useToastNotification();
  const activeTheme = getActiveTheme();
  const themeIcons = ThemeIconsMap[activeTheme] || ThemeIconsMap.default;

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
            {/* Theme floating SVG decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              {themeIcons.map((IconComponent, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary/20"
                  style={{
                    top: `${15 + i * 28}%`,
                    right: `${5 + i * 8}%`,
                    width: "48px",
                    height: "48px",
                  }}
                  animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <IconComponent size={48} />
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
                  <div className="mt-5 flex gap-3 items-center justify-center opacity-25 text-primary">
                    {themeIcons.map((IconComponent, i) => (
                      <IconComponent key={i} size={24} />
                    ))}
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