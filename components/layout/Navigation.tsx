"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/collections", label: "Collection", desc: "Selected contemporary works" },
  { href: "/about", label: "About", desc: "The philosophy of quiet luxury" },
  { href: "/settings", label: "Settings", desc: "Preferences and Theme" },
  { href: "/contact", label: "Contact", desc: "Private acquisition inquiries" },
];

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-background flex flex-col justify-between p-8 md:p-16 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-2xl tracking-widest uppercase"
            >
              D&apos;Arte
            </Link>
            <button
              onClick={onClose}
              className="text-foreground hover:text-muted transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col items-center md:items-start justify-center space-y-12 md:space-y-16 flex-1 max-w-4xl mx-auto w-full">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col md:flex-row md:items-baseline md:space-x-12 w-full text-center md:text-left"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-serif text-5xl md:text-7xl text-foreground hover:text-muted transition-colors duration-500 relative inline-block"
                >
                  {link.label}
                </Link>
                <span className="text-xs tracking-widest uppercase text-muted mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:block hidden">
                  {link.desc}
                </span>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center text-sm tracking-widest uppercase text-muted space-y-4 md:space-y-0"
          >
            <div className="flex space-x-8">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Email</a>
            </div>
            <div>
              <a href="#" className="hover:text-foreground transition-colors">Newsletter</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
