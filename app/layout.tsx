import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/animations/Loader";
import Header from "@/components/layout/Header";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "D'Arte | Luxury Digital Gallery",
  description: "A world-class luxury digital gallery and cinematic boutique art platform.",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground transition-colors duration-500 ease-[0.22,1,0.36,1]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Loader />
          <CustomCursor />
          <SmoothScroll>
            <Header />
            <CartDrawer />
            <main className="min-h-screen pt-24 relative">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: "font-sans text-xs tracking-widest uppercase border-border bg-background text-foreground rounded-none shadow-xl",
              style: {
                borderRadius: '0px',
                border: '1px solid var(--color-border)'
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
