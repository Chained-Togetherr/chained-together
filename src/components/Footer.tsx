import React from "react";
import { Heart, Instagram, MessageCircle } from "lucide-react";
import profile from "@/assets/logo2.png";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/store";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--gradient-footer)" }}>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand — logo tanpa lingkaran */}
          <div className="flex items-center gap-2.5">
            <img
              src={profile}
              alt="Chained Together"
              className="w-8 h-8 object-contain"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2)) brightness(1.1)" }}
            />
            <span
              className="text-white/85 font-light tracking-wide"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.05rem" }}
            >
              Chained Together
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-all duration-200"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Copyright */}
          <p
            className="flex items-center gap-1.5 text-white/45 text-xs"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            © {currentYear} Chained Together · Made with
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
