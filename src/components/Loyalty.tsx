import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import lableImg from "@/assets/Lable.png";
import loyaltiImg from "@/assets/Loyalticard.png";

const Loyalty = () => {
  const isMobile = useIsMobile();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="loyalty" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl md:text-4xl font-serif font-semibold mb-3"
            style={{
              background: "var(--text-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Loyalty Program
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Dapatkan kartu loyalti dan nikmati keuntungan eksklusif dari ChainedTogether
          </p>
        </motion.div>

        {/* Desktop: side by side with hover scale up card */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-6 justify-center items-start max-w-4xl mx-auto"
          >
            <motion.div
              className="flex-1 rounded-xl shadow-[var(--shadow-card)] border border-border overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <img
                src={lableImg}
                alt="ChainedTogether Label"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              className="flex-1 rounded-xl shadow-[var(--shadow-card)] border border-border overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.04, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <img
                src={loyaltiImg}
                alt="ChainedTogether Loyalty Card"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        ) : (
          /* Mobile: card flip animation */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div
              className="relative w-full max-w-sm cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="relative w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Front - Label */}
                <div
                  className="w-full rounded-xl shadow-[var(--shadow-card)] border border-border overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={lableImg}
                    alt="ChainedTogether Label"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Back - Loyalty Card */}
                <div
                  className="absolute inset-0 w-full rounded-xl shadow-[var(--shadow-card)] border border-border overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={loyaltiImg}
                    alt="ChainedTogether Loyalty Card"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground animate-pulse">
              Tap untuk membalik kartu
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Loyalty;
