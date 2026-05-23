"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Navigation from "./Navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getTotals().count);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[0.22,1,0.36,1] ${
          isScrolled
            ? "py-5 bg-background/80 backdrop-blur-md border-b border-border/50"
            : "py-10 bg-transparent"
        } px-8 md:px-16`}
      >
        <div className="flex justify-between items-center max-w-[1600px] mx-auto">
          {/* Menu Button */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="flex items-center space-x-2 text-foreground hover:text-muted transition-colors"
          >
            <Menu size={20} strokeWidth={1.5} />
            <span className="hidden md:block text-xs tracking-widest uppercase">
              Menu
            </span>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
          >
            D&apos;Arte
          </Link>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="flex items-center space-x-2 text-foreground hover:text-muted transition-colors relative"
          >
            <span className="hidden md:block text-xs tracking-widest uppercase">
              Cart
            </span>
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </header>

      <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
