// Product and Cart Store
import productHuruf from "@/assets/product/product-huruf.jpg";
import huruf1 from "@/assets/product/huruf/f1.jpeg";
import huruf2 from "@/assets/product/huruf/f2.jpeg";
import huruf3 from "@/assets/product/huruf/f3.jpeg";
import huruf4 from "@/assets/product/huruf/f4.jpeg";
import huruf5 from "@/assets/product/huruf/f5.jpeg";
import huruf6 from "@/assets/product/huruf/f6.jpeg";


import productCherry from "@/assets/product/product-cherry.jpg";
import productBunga from "@/assets/product/product-bunga.jpg";

export interface ProductVariant {
  letter?: string;
  hasBell?: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  hasVariants: boolean;
  letterOptions?: string[];
  bellOption?: boolean;
  bellPrice?: number;
  soldOut?: boolean;
  limited?: boolean;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  totalPrice: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Keychain Custom Huruf A-Z",
    price: 7000,
    image: productHuruf,
    images: [productHuruf, huruf1, huruf2, huruf3, huruf4, huruf5, huruf6],
    hasVariants: true,
    letterOptions: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    bellOption: true,
    bellPrice: 3000,
    limited: false,
    soldOut: false,
  },
  {
    id: 2,
    name: "Keychain Cherry",
    price: 5000,
    image: productCherry,
    //images: [productCherry, productBunga],
    hasVariants: true,
    bellOption: true,
    bellPrice: 2000,
    limited: false,
    soldOut: false,
  },
  {
    id: 3,
    name: "Keychain Bunga",
    price: 5000,
    image: productBunga,
    //images: [productBunga, productHuruf],
    hasVariants: true,
    bellOption: true,
    bellPrice: 2000,
    limited: false,
    soldOut: false,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppMessage = (cart: CartItem[]): string => {
  let message = "Halo! Saya ingin memesan:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`;
    if (item.variant.letter) {
      message += `   Huruf: ${item.variant.letter}\n`;
    }
    if (item.variant.hasBell !== undefined) {
      message += `   Lonceng: ${item.variant.hasBell ? "Ya" : "Tidak"}\n`;
    }
    message += `   Jumlah: ${item.quantity}\n`;
    message += `   Harga: ${formatPrice(item.totalPrice)}\n\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  message += `Total: ${formatPrice(total)}\n\n`;
  message += "Mohon konfirmasi ketersediaan dan proses pemesanan. Terima kasih!";

  return encodeURIComponent(message);
};

export const WHATSAPP_NUMBER = "6289518033862";
export const INSTAGRAM_URL = "https://www.instagram.com/_chained.together/";