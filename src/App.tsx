import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { getActiveTheme, getThemeData } from "@/config/theme";
import { useEffect } from "react";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ThemeApplicator = ({ children }: { children: React.ReactNode }) => {
  const theme = getActiveTheme();
  const data = getThemeData();

  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-lebaran",
      "theme-kemerdekaan",
      "theme-valentine",
      "theme-natal",
      "theme-semi",
      "theme-panas",
      "theme-gugur",
      "theme-winter"
    );
    if (data.cssClass) {
      document.documentElement.classList.add(data.cssClass);
    }
  }, [theme, data.cssClass]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <ToastProvider>
            <ThemeApplicator>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/produk" element={<ProductsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ThemeApplicator>
          </ToastProvider>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
