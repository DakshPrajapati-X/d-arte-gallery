"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotals } = useCartStore();
  const { subtotal } = getTotals();

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-4xl mb-4">Your collection is empty</h1>
        <Link href="/collections" className="text-xs tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted transition-colors">
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-20 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
      {/* Left: Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-3/5"
      >
        <h1 className="font-serif text-4xl mb-12">Checkout</h1>

        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          {/* Contact */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6">Contact Information</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
              />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50 col-span-1"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50 col-span-1"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50 col-span-1"
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-sm tracking-widest uppercase mb-6">Payment</h2>
            <div className="p-4 border border-border bg-muted/5 mb-4 flex items-center justify-between">
              <span className="text-sm text-muted">Test mode is active. Use any card details.</span>
              <Lock size={14} className="text-muted" />
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full p-4 bg-transparent border border-border outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
                />
              </div>
            </div>
          </section>

          <button className="w-full py-5 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors mt-8">
            Complete Acquisition
          </button>
        </form>
      </motion.div>

      {/* Right: Order Summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-2/5"
      >
        <div className="bg-muted/5 p-8 lg:sticky lg:top-32">
          <h2 className="text-sm tracking-widest uppercase mb-8 border-b border-border pb-4">Order Summary</h2>
          
          <div className="space-y-6 mb-8 border-b border-border pb-8">
            {items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="relative w-16 h-20 bg-muted/20 flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full z-10">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 flex justify-between">
                  <h3 className="font-serif">{item.title}</h3>
                  <span className="text-sm">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm mb-8 border-b border-border pb-8 text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-foreground">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated next step</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="flex justify-between items-end font-serif text-2xl">
            <span className="text-sm font-sans tracking-widest uppercase">Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
