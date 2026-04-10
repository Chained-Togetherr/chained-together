import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductVariant, CartItem, getEffectivePrice } from "@/lib/store";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant) => void;
  removeFromCart: (productId: number, variant: ProductVariant) => void;
  updateQuantity: (productId: number, variant: ProductVariant, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const getVariantKey = (productId: number, variant: ProductVariant): string => {
  return `${productId}-${variant.letter || "none"}-${variant.hasBell ? "bell" : "no-bell"}`;
};

const calculateItemPrice = (product: Product, variant: ProductVariant, quantity: number): number => {
  let price = getEffectivePrice(product);
  if (variant.hasBell && product.bellPrice) {
    price += product.bellPrice;
  }
  return price * quantity;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: ProductVariant) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.variant.letter === variant.letter &&
          item.variant.hasBell === variant.hasBell
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingIndex].quantity + 1;
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: newQuantity,
          totalPrice: calculateItemPrice(product, variant, newQuantity),
        };
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          product,
          variant,
          quantity: 1,
          totalPrice: calculateItemPrice(product, variant, 1),
        },
      ];
    });
  };

  const removeFromCart = (productId: number, variant: ProductVariant) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.variant.letter === variant.letter &&
            item.variant.hasBell === variant.hasBell
          )
      )
    );
  };

  const updateQuantity = (productId: number, variant: ProductVariant, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.variant.letter === variant.letter &&
          item.variant.hasBell === variant.hasBell
        ) {
          return {
            ...item,
            quantity,
            totalPrice: calculateItemPrice(item.product, variant, quantity),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
