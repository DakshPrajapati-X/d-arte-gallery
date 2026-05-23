"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotals } = useCartStore();
  const { subtotal } = getTotals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={closeCart}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-border z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl tracking-widest uppercase">Collection</h2>
              <button
                onClick={closeCart}
                className="text-foreground hover:text-muted transition-colors"
                aria-label="Close cart"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-8">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif text-xl text-muted">Your collection is empty.</p>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-muted transition-colors"
                  >
                    Discover Artworks
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex space-x-4"
                  >
                    <div className="relative w-24 h-32 flex-shrink-0 bg-muted/20">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-serif text-lg">{item.title}</h3>
                        <p className="text-sm text-muted mt-1">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-foreground hover:bg-muted/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-foreground hover:bg-muted/10 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted hover:text-foreground transition-colors p-2"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif text-xl">${subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted mb-6">Shipping and taxes calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-foreground text-background text-center text-xs tracking-widest uppercase hover:bg-foreground/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
