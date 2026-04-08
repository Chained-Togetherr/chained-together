import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import profile from "@/assets/logo2.png";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsPage = location.pathname === "/produk";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "#home", type: "section" },
    { name: "Tentang", href: "#tentang", type: "section" },
    { name: "Produk", href: "#produk", type: "section" },
    { name: "Kontak", href: "#kontak", type: "section" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    const navbarHeight = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - navbarHeight, behavior: "smooth" });
  };

  const handleNavClick = (link: { name: string; href: string; type: string }) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);

    if (link.type === "route") {
      navigate(link.href);
      return;
    }

    if (isProductsPage) {
      navigate("/");
      setTimeout(() => {
        scrollToSection(link.href);
      }, 400);
    } else {
      // Small delay to let menu close animation start, then scroll
      setTimeout(() => {
        scrollToSection(link.href);
      }, 50);
    }
  };

  const isLight = isProductsPage && !isScrolled;
  const navBg = isScrolled
    ? "glass-dark"
    : isProductsPage
    ? "navbar-light"
    : "bg-transparent";
  const logoTextColor = isLight ? "text-foreground" : "text-white";
  const linkColor = isLight
    ? "text-foreground/60 hover:text-foreground"
    : "text-white/75 hover:text-white";
  const iconColor = isLight
    ? "text-foreground/60 hover:text-foreground"
    : "text-white/80 hover:text-white";
  const mobileMenuBorder = isLight ? "border-foreground/10" : "border-white/10";
  const mobileLinkColor = isLight
    ? "text-foreground/65 hover:text-foreground hover:bg-black/5"
    : "text-white/75 hover:text-white hover:bg-white/10";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${navBg}`}
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
            style={{ position: "relative", zIndex: 10000 }}
          >
            <img
              src={profile}
              alt="Chained Together"
              className="w-9 h-9 object-contain group-hover:opacity-80 transition-opacity duration-200"
              style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.15))" }}
            />
            <span
              className={`font-medium group-hover:opacity-80 transition-all duration-300 ${logoTextColor}`}
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "1.15rem",
                letterSpacing: "0.03em",
              }}
            >
              Chained Together
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`nav-link transition-colors duration-300 ${linkColor}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div
            className="flex items-center gap-5"
            style={{ position: "relative", zIndex: 10000 }}
          >
            <button
              onClick={onCartClick}
              className={`relative p-2 transition-colors duration-300 ${iconColor}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-pulse absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  style={{ background: "hsl(var(--rose))" }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${iconColor}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
              style={{ position: "relative", zIndex: 9999 }}
            >
              <div className={`py-4 space-y-1 border-t mt-1 ${mobileMenuBorder}`}>
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    onClick={() => handleNavClick(link)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${mobileLinkColor}`}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      WebkitTapHighlightColor: "transparent",
                      touchAction: "manipulation",
                      cursor: "pointer",
                    }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;