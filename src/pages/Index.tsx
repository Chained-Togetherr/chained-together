import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Loyalty from "@/components/Loyalty";
import Showcase from "@/components/Showcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import SeasonalDecorations from "@/components/SeasonalDecorations";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SeasonalDecorations />
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Products />
        <Loyalty />
        <Showcase />
        <Contact />
      </main>
      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;