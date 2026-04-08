import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToastNotification } from "@/contexts/ToastContext";
import { formatPrice, generateWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/store";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { showToast } = useToastNotification();

  // Lock body scroll when modal is open, restore scroll position on close
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" style={{ color: "hsl(var(--rose))" }} />
                <h2
                  className="text-xl text-foreground font-medium"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.35rem" }}
                >
                  Keranjang
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(345 55% 68% / 0.08)" }}
                  >
                    <ShoppingBag className="w-8 h-8" style={{ color: "hsl(var(--rose))" }} />
                  </div>
                  <p className="text-foreground font-medium text-sm" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}>
                    Keranjang masih kosong
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Yuk, tambahkan produk favoritmu!
                  </p>
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
                      style={{ background: "hsl(38 42% 97%)" }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-18 h-18 rounded-xl object-cover flex-shrink-0"
                        style={{ width: "72px", height: "72px" }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-medium text-foreground truncate"
                          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1rem" }}
                        >
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.variant.letter && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: "hsl(345 55% 68% / 0.10)",
                                color: "hsl(var(--rose-deep))",
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
                                background: "hsl(275 35% 87% / 0.5)",
                                color: "hsl(275 30% 45%)",
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
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-border hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-medium text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-border hover:border-primary transition-colors text-muted-foreground hover:text-foreground"
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
                        <p
                          className="mt-2 font-semibold text-sm"
                          style={{
                            background: "linear-gradient(135deg, hsl(345 55% 60%), hsl(345 50% 52%))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                        >
                          {formatPrice(item.totalPrice)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="px-6 py-5 border-t border-border flex-shrink-0"
                style={{ background: "hsl(38 42% 97%)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Total Pembayaran
                  </span>
                  <span
                    className="text-2xl font-semibold"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      background: "linear-gradient(135deg, hsl(345 55% 56%), hsl(345 50% 48%))",
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
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-medium text-sm text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #25d366, #128c7e)",
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