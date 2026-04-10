import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, BellOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ProductVariant, formatPrice, getEffectivePrice, getDiscountPercentage } from "@/lib/store";
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
  const [isAnimating, setIsAnimating] = useState(false);

  // Drag / swipe state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [releaseOffset, setReleaseOffset] = useState<number | null>(null);

  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const hasMoved = useRef(false);
  const isHorizontalScroll = useRef<boolean | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setSelectedLetter("");
      setHasBell(false);
      setCurrentImageIndex(0);
      setDirection(1);
      setDragOffset(0);
      setIsDragging(false);
      setIsAnimating(false);
      setReleaseOffset(null);
      dragStartX.current = null;
      hasMoved.current = false;
      isHorizontalScroll.current = null;
    }
  }, [isOpen]);

  useScrollLock(isOpen);

  if (!product) return null;

  const images: string[] =
    product.images && product.images.length > 0 ? product.images : [product.image];
  const totalImages = images.length;
  const hasMultiple = totalImages > 1;

  const goTo = (index: number, dir: 1 | -1, fromDragPx?: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    if (fromDragPx !== undefined) {
      setReleaseOffset(fromDragPx);
    } else {
      setReleaseOffset(null);
    }
    setCurrentImageIndex((index + totalImages) % totalImages);
    setTimeout(() => {
      setIsAnimating(false);
      setReleaseOffset(null);
    }, 400);
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
    if (i === currentImageIndex) return;
    const dir: 1 | -1 = i > currentImageIndex ? 1 : -1;
    goTo(i, dir);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // Pointer/Touch drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    if (!hasMultiple) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    hasMoved.current = false;
    isHorizontalScroll.current = null;
    if (imageContainerRef.current) {
      containerWidth.current = imageContainerRef.current.offsetWidth;
    }
    setIsDragging(true);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - (dragStartY.current ?? e.clientY);
    if (isHorizontalScroll.current === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      isHorizontalScroll.current = Math.abs(dx) >= Math.abs(dy);
    }
    if (isHorizontalScroll.current === false) return;
    if (Math.abs(dx) > 3) {
      hasMoved.current = true;
      e.preventDefault();
    }
    let offset = dx;
    const resistance = 0.28;
    if ((currentImageIndex === 0 && dx > 0) || (currentImageIndex === totalImages - 1 && dx < 0)) {
      offset = dx * resistance;
    }
    setDragOffset(offset);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const dx = e.clientX - dragStartX.current;
    const threshold = Math.min(containerWidth.current * 0.25, 80);
    const cw = containerWidth.current || 1;
    if (hasMoved.current && Math.abs(dx) > threshold && isHorizontalScroll.current !== false) {
      const offsetPx = dx;
      if (dx < 0) goTo(currentImageIndex + 1, 1, offsetPx);
      else goTo(currentImageIndex - 1, -1, offsetPx);
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
    dragStartY.current = null;
    hasMoved.current = false;
    isHorizontalScroll.current = null;
  };

  const onPointerCancel = () => {
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
    hasMoved.current = false;
    isHorizontalScroll.current = null;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    dragStartY.current = touch.clientY;
    hasMoved.current = false;
    isHorizontalScroll.current = null;
    if (imageContainerRef.current) {
      containerWidth.current = imageContainerRef.current.offsetWidth;
    }
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartX.current;
    const dy = touch.clientY - (dragStartY.current ?? touch.clientY);
    if (isHorizontalScroll.current === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      isHorizontalScroll.current = Math.abs(dx) >= Math.abs(dy);
    }
    if (isHorizontalScroll.current === false) return;
    if (Math.abs(dx) > 5) {
      hasMoved.current = true;
      e.preventDefault();
    }
    let offset = dx;
    const resistance = 0.28;
    if ((currentImageIndex === 0 && dx > 0) || (currentImageIndex === totalImages - 1 && dx < 0)) {
      offset = dx * resistance;
    }
    setDragOffset(offset);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null || !hasMultiple) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - dragStartX.current;
    const threshold = Math.min(containerWidth.current * 0.25, 80);
    if (hasMoved.current && Math.abs(dx) > threshold && isHorizontalScroll.current !== false) {
      const offsetPx = dx;
      if (dx < 0) goTo(currentImageIndex + 1, 1, offsetPx);
      else goTo(currentImageIndex - 1, -1, offsetPx);
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
    dragStartY.current = null;
    hasMoved.current = false;
    isHorizontalScroll.current = null;
  };

  const calculatePrice = () => {
    let price = getEffectivePrice(product);
    if (hasBell && product.bellPrice) price += product.bellPrice;
    return price;
  };

  const hasDiscount = product.discount === true && !!product.discountPrice;
  const discountPercent = getDiscountPercentage(product);

  const calculateOriginalPrice = () => {
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

  // Gallery-style slide variants — only image slides, not entire modal
  const cw = containerWidth.current || 1;
  const slideVariants = {
    enter: (dir: number) => {
      // If coming from a drag release, start from where the drag left off
      if (releaseOffset !== null) {
        // The entering image was peeking: its position = 100% + dragOffset (for next) or -100% + dragOffset (for prev)
        const pxOffset = dir > 0
          ? cw + releaseOffset   // releaseOffset is negative when swiping left
          : -cw + releaseOffset; // releaseOffset is positive when swiping right
        return { x: pxOffset };
      }
      return { x: dir > 0 ? cw : -cw };
    },
    center: {
      x: 0,
    },
    exit: (dir: number) => {
      // Always slide fully off-screen so the old image stays visible until covered
      return { x: dir > 0 ? -cw : cw };
    },
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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm"
            style={{ zIndex: 50 }}
          />

          {/* Modal container — uses safe inset to avoid header overlap */}
          <div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: 51,
              // Push down from top to avoid navbar; on mobile use safe area
              paddingTop: "env(safe-area-inset-top, 0px)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="pointer-events-auto w-full"
              style={{
                maxWidth: "440px",
                // Vertical margin: top margin accounts for navbar (64–80px) + breathing room
                marginTop: "clamp(72px, 10vh, 96px)",
                marginBottom: "clamp(16px, 4vh, 40px)",
                marginLeft: "16px",
                marginRight: "16px",
                // Max height so modal never overflows viewport
                maxHeight: "calc(100vh - clamp(88px, 14vh, 136px))",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "100%" }}
              >
                {/* Image Carousel — fixed height, images slide inside */}
                <div
                  ref={imageContainerRef}
                  className="relative flex-shrink-0 overflow-hidden select-none"
                  style={{
                    // Responsive image height
                    height: "clamp(180px, 36vw, 280px)",
                    background: "hsl(38 42% 97%)",
                    borderTopLeftRadius: "1.5rem",
                    borderTopRightRadius: "1.5rem",
                    cursor: hasMultiple ? (isDragging ? "grabbing" : "grab") : "default",
                    touchAction: "pan-y",
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerCancel}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Slide strip — both entering and exiting images visible simultaneously */}
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentImageIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: isDragging
                          ? { duration: 0 }
                          : releaseOffset !== null
                            ? { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 }
                            : { type: "spring" as const, stiffness: 350, damping: 30 },
                      }}
                      className="absolute inset-0"
                      style={{
                        transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
                        transition: isDragging ? "none" : undefined,
                        willChange: "transform",
                      }}
                      draggable={false}
                    >
                      <img
                        src={images[currentImageIndex]}
                        alt={`${product.name} foto ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        style={{
                          background: "hsl(38 42% 97%)",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Ghost image while dragging — peeking next/prev */}
                  {isDragging && hasMultiple && dragOffset !== 0 && (
                    <div
                      className="absolute inset-0"
                      style={{
                        transform:
                          dragOffset < 0
                            ? `translateX(calc(100% + ${dragOffset}px))`
                            : `translateX(calc(-100% + ${dragOffset}px))`,
                        willChange: "transform",
                      }}
                    >
                      <img
                        src={
                          dragOffset < 0
                            ? images[(currentImageIndex + 1) % totalImages]
                            : images[(currentImageIndex - 1 + totalImages) % totalImages]
                        }
                        alt="preview"
                        className="w-full h-full object-contain"
                        style={{
                          background: "hsl(38 42% 97%)",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* Close button */}
                  <button
                    onClick={handleCloseClick}
                    className="absolute top-3 right-3 p-2 bg-white/85 backdrop-blur-sm text-foreground hover:bg-white rounded-full transition-all shadow-md"
                    style={{ zIndex: 20 }}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Arrow buttons — desktop */}
                  {hasMultiple && (
                    <>
                      <button
                        onClick={goPrev}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all text-foreground"
                        style={{ zIndex: 20 }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goNext}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all text-foreground"
                        style={{ zIndex: 20 }}
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
                          className="transition-all duration-250 rounded-full"
                          style={{
                            width: i === currentImageIndex ? "20px" : "6px",
                            height: "6px",
                            background:
                              i === currentImageIndex
                                ? "hsl(345 55% 62%)"
                                : "rgba(255,255,255,0.7)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Scrollable content area */}
                <div className="overflow-y-auto flex-1 modal-scroll">
                  {/* Header */}
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
                    {hasDiscount ? (
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm line-through text-muted-foreground/50"
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          {formatPrice(calculateOriginalPrice())}
                        </span>
                        <span
                          className="font-semibold"
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            background: "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 85% 45%))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "1.1rem",
                          }}
                        >
                          {formatPrice(calculatePrice())}
                        </span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                          style={{
                            background: "linear-gradient(135deg, hsl(0 75% 55%), hsl(15 85% 50%))",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                        >
                          -{discountPercent}%
                        </span>
                      </div>
                    ) : (
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
                    )}
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
                        <div className="flex items-center gap-2">
                          {hasDiscount && (
                            <span
                              className="text-sm line-through text-muted-foreground/50"
                              style={{ fontFamily: "DM Sans, sans-serif" }}
                            >
                              {formatPrice(calculateOriginalPrice())}
                            </span>
                          )}
                          <span
                            className="text-2xl font-semibold"
                            style={{
                              fontFamily: "Cormorant Garamond, Georgia, serif",
                              background: hasDiscount
                                ? "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 85% 45%))"
                                : "linear-gradient(135deg, hsl(345 55% 56%), hsl(345 50% 48%))",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {formatPrice(calculatePrice())}
                          </span>
                        </div>
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
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VariantModal;