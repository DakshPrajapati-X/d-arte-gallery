"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import type { ArtworkDetail } from "@/types/artwork";

export default function ArtworkClient({ artwork }: { artwork: ArtworkDetail }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      image: artwork.imageUrl,
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
      {/* Left: Artwork Image */}
      <div className="w-full lg:w-3/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[85vh] bg-muted/10 overflow-hidden"
        >
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 60vw"
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              setIsPortrait(target.naturalHeight > target.naturalWidth);
            }}
            className={`transition-transform duration-1000 hover:scale-[1.05] cursor-none ${
              isPortrait === true ? "object-contain" : "object-cover"
            }`}
            priority
          />
        </motion.div>
      </div>

      {/* Right: Product Info (Sticky) */}
      <div className="w-full lg:w-2/5">
        <div className="lg:sticky lg:top-32 h-auto flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-4xl md:text-5xl mb-2">{artwork.title}</h1>
            <p className="text-xl text-muted mb-8">{artwork.artist}</p>

            <div className="font-serif text-2xl mb-12 text-muted/60">
              ${artwork.price.toLocaleString()}
            </div>

            <div className="space-y-6 text-sm mb-12 border-t border-b border-border/30 py-8">
              <div className="flex justify-between">
                <span className="text-muted tracking-widest uppercase text-xs">Dimensions</span>
                <span>{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted tracking-widest uppercase text-xs">Medium</span>
                <span>{artwork.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted tracking-widest uppercase text-xs">Year</span>
                <span>{artwork.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted tracking-widest uppercase text-xs">Framing</span>
                <span>{artwork.framed ? "Included" : "Unframed"}</span>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-12 text-muted whitespace-pre-wrap">
              {artwork.description}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full py-4 md:py-5 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-muted transition-colors duration-300 relative overflow-hidden"
            >
              <span className={`transition-opacity duration-300 ${isAdding ? "opacity-0" : "opacity-100"}`}>
                Add to Collection
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isAdding ? "opacity-100" : "opacity-0"}`}>
                Artwork Added
              </span>
            </button>

            <div className="mt-16 pt-8 border-t border-border/30">
              <h3 className="font-serif text-2xl mb-4">The Story</h3>
              <p className="text-sm leading-relaxed text-muted italic whitespace-pre-wrap">
                &quot;{artwork.story}&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
