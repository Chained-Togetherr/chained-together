import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Instagram, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/store";

const Contact = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section id="kontak" className="py-20 md:py-28" style={{ background: "hsl(38 42% 97%)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            Hubungi Kami
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Kontak & <em>Lokasi</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-transparent hover:border-emerald-200/60 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground group-hover:text-emerald-600 transition-colors text-sm"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}>
                  WhatsApp
                </h3>
                <p className="text-muted-foreground text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Chat langsung dengan kami
                </p>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-7 h-7 rounded-full border border-emerald-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-transparent hover:border-pink-200/60 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-subtle)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                style={{ background: "var(--gradient-instagram)" }}>
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground group-hover:text-pink-500 transition-colors"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}>
                  Instagram
                </h3>
                <p className="text-muted-foreground text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  @_chained.together
                </p>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-7 h-7 rounded-full border border-pink-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl"
              style={{ boxShadow: "var(--shadow-subtle)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(345 55% 68% / 0.10)" }}>
                <MapPin className="w-5 h-5" style={{ color: "hsl(var(--rose))" }} />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1.5"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}>
                  Alamat
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
                  Jl. Letjen Ibrahim Adjie No.178<br />
                  RT.03/RW.08, Sindangbarang<br />
                  Kec. Bogor Barat, Kota Bogor<br />
                  Jawa Barat 16117
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-2xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.44157279577223!2d106.7674089519895!3d-6.580514962460624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4f906e40827%3A0x6b93a4462670547c!2sSMK%20Infokom%20Kota%20Bogor!5e0!3m2!1sid!2sid!4v1768929839502!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;