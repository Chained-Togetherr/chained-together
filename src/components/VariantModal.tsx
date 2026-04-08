import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, BellOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ProductVariant, formatPrice } from "@/lib/store";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface VariantModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (variant: ProductVariant) => void;
}

const VariantModal = ({ product, isOpen, onClose, onConfirm }: VariantModalProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [hasBell, setHasBell] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Drag / swipe state
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedLetter("");
      setHasBell(false);
      setCurrentImageIndex(0);
      setDirection(1);
    }
  }, [isOpen]);

  useScrollLock(isOpen);

  if (!product) return null;

  const images: string[] =
    product.images && product.images.length > 0 ? product.images : [product.image];
  const totalImages = images.length;
  const hasMultiple = totalImages > 1;

  const goTo = (index: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrentImageIndex((index + totalImages) % totalImages);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(currentImageIndex - 1, -1);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(currentImageIndex + 1, 1);
  };

  const handleDotClick = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    const dir: 1 | -1 = i > currentImageIndex ? 1 : -1;
    goTo(i, dir);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // Drag / Swipe — hanya aktif jika bukan tombol
  const onPointerDown = (e: React.PointerEvent) => {
    if (!hasMultiple) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) {
      isDragging.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        goTo(currentImageIndex + 1, 1);
      } else {
        goTo(currentImageIndex - 1, -1);
      }
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const calculatePrice = () => {
    let price = product.price;
    if (hasBell && product.bellPrice) price += product.bellPrice;
    return price;
  };

  const canSubmit = () => {
    if (product.letterOptions && product.letterOptions.length > 0) {
      return selectedLetter !== "";
    }
    return true;
  };

  const handleConfirm = () => {
    const variant: ProductVariant = {};
    if (product.letterOptions) variant.letter = selectedLetter;
    if (product.bellOption) variant.hasBell = hasBell;
    onConfirm(variant);
    onClose();
  };

  // Slide animation: foto bergerak secara fisik sesuai arah
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-md max-h-[88vh] overflow-y-auto bg-white rounded-3xl shadow-2xl relative pointer-events-auto modal-scroll"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Image Carousel ── */}
              <div
                ref={imageContainerRef}
                className="relative w-full overflow-hidden select-none"
                style={{
                  aspectRatio: "4 / 3",
                  background: "hsl(38 42% 97%)",
                  marginTop: "10px",
                  borderTopLeftRadius: "1.5rem",
                  borderTopRightRadius: "1.5rem",
                  cursor: hasMultiple ? "grab" : "default",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                {/* Images with directional slide animation */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentImageIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
                    src={images[currentImageIndex]}
                    alt={`${product.name} foto ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain absolute inset-0"
                    style={{
                      background: "hsl(38 42% 97%)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Close button — z-20, pointer-events-auto */}
                <button
                  onClick={handleCloseClick}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm text-foreground hover:bg-white rounded-full transition-all shadow-md"
                  style={{ zIndex: 20, pointerEvents: "auto" }}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Arrow buttons — z-20, pointer-events-auto */}
                {hasMultiple && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all text-foreground"
                      style={{ zIndex: 20, pointerEvents: "auto" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all text-foreground"
                      style={{ zIndex: 20, pointerEvents: "auto" }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {hasMultiple && (
                  <div
                    className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5"
                    style={{ zIndex: 20 }}
                  >
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => handleDotClick(e, i)}
                        className="transition-all duration-200 rounded-full"
                        style={{
                          width: i === currentImageIndex ? "18px" : "6px",
                          height: "6px",
                          background:
                            i === currentImageIndex
                              ? "hsl(345 55% 62%)"
                              : "rgba(255,255,255,0.7)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                          pointerEvents: "auto",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Header: label + name + price */}
              <div className="px-6 pt-4 pb-4 border-b border-border/50">
                <p
                  className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1"
                  style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.12em" }}
                >
                  Pilih Varian
                </p>
                <h3
                  className="font-medium text-foreground mb-1.5"
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: "1.25rem",
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="font-semibold"
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    background: "linear-gradient(135deg, hsl(345 55% 60%), hsl(345 50% 52%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.1rem",
                  }}
                >
                  {formatPrice(calculatePrice())}
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">

                {/* Letter Selection */}
                {product.letterOptions && (
                  <div className="mb-6">
                    <label
                      className="block text-xs font-medium text-foreground mb-3 tracking-wide uppercase"
                      style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em" }}
                    >
                      Pilih Huruf
                      {selectedLetter && (
                        <span
                          className="ml-2 px-2.5 py-0.5 rounded-full text-white text-[10px] normal-case tracking-normal"
                          style={{ background: "hsl(var(--rose))" }}
                        >
                          {selectedLetter} dipilih
                        </span>
                      )}
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {product.letterOptions.map((letter) => (
                        <button
                          key={letter}
                          onClick={() => setSelectedLetter(letter)}
                          className={`w-full aspect-square rounded-xl font-bold text-base transition-all duration-200 ${
                            selectedLetter === letter
                              ? "text-white shadow-md scale-105"
                              : "bg-muted text-foreground hover:bg-accent"
                          }`}
                          style={
                            selectedLetter === letter
                              ? {
                                  background:
                                    "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))",
                                  fontFamily: "Cormorant Garamond, Georgia, serif",
                                }
                              : { fontFamily: "Cormorant Garamond, Georgia, serif" }
                          }
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bell Option */}
                {product.bellOption && (
                  <div className="mb-6">
                    <label
                      className="block text-xs font-medium text-foreground mb-3 tracking-wide uppercase"
                      style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.08em" }}
                    >
                      Tambah Lonceng
                      <span className="ml-1.5 text-muted-foreground normal-case tracking-normal font-normal">
                        (+{formatPrice(product.bellPrice || 0)})
                      </span>
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setHasBell(false)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          !hasBell ? "text-white shadow-md" : "bg-muted text-foreground hover:bg-accent"
                        }`}
                        style={
                          !hasBell
                            ? {
                                background:
                                  "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))",
                                fontFamily: "DM Sans, sans-serif",
                              }
                            : { fontFamily: "DM Sans, sans-serif" }
                        }
                      >
                        <BellOff className="w-4 h-4" />
                        Tidak
                      </button>
                      <button
                        onClick={() => setHasBell(true)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          hasBell ? "text-white shadow-md" : "bg-muted text-foreground hover:bg-accent"
                        }`}
                        style={
                          hasBell
                            ? {
                                background:
                                  "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))",
                                fontFamily: "DM Sans, sans-serif",
                              }
                            : { fontFamily: "DM Sans, sans-serif" }
                        }
                      >
                        <Bell className="w-4 h-4" />
                        Ya
                      </button>
                    </div>
                  </div>
                )}

                {/* Total & Confirm */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      Total Harga
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
                      {formatPrice(calculatePrice())}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: canSubmit() ? 1.02 : 1 }}
                    whileTap={{ scale: canSubmit() ? 0.97 : 1 }}
                    onClick={handleConfirm}
                    disabled={!canSubmit()}
                    className="w-full py-3.5 rounded-2xl font-medium text-sm transition-all duration-300"
                    style={
                      canSubmit()
                        ? {
                            background:
                              "linear-gradient(135deg, hsl(345 55% 68%), hsl(345 50% 58%))",
                            color: "white",
                            boxShadow: "var(--shadow-button)",
                            fontFamily: "DM Sans, sans-serif",
                            letterSpacing: "0.03em",
                          }
                        : {
                            background: "hsl(var(--muted))",
                            color: "hsl(var(--muted-foreground))",
                            cursor: "not-allowed",
                            fontFamily: "DM Sans, sans-serif",
                          }
                    }
                  >
                    {canSubmit() ? "Tambah ke Keranjang" : "Pilih varian terlebih dahulu"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VariantModal;