"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ArtworkCard } from "@/types/artwork";

export default function HomeClient({ featuredWorks, heroImages }: { featuredWorks: ArtworkCard[], heroImages: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    // Slow auto-changing background (12s per image)
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
      }, 12000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  return (
    <div ref={containerRef} className="w-full">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-background">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10 mix-blend-multiply" />
          <AnimatePresence>
            {heroImages.map((src, idx) => (
              idx === currentHeroIdx && (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 0.85, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 3, ease: "easeInOut" },
                    scale: { duration: 15, ease: "linear" }
                  }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={src}
                    alt="Hero background artwork"
                    fill
                    className="object-cover object-[50%_40%]"
                    priority={idx === 0}
                    quality={90}
                    sizes="100vw"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <div className="z-10 text-center px-6 text-[#F6F3EE] max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(32px,5vw,70px)] leading-[1.1] tracking-wide uppercase drop-shadow-lg max-w-4xl"
          >
            Quiet Works for<br />Thoughtful Spaces.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <Link
              href="/collections"
              className="text-xs tracking-[0.2em] uppercase pb-2 border-b border-[#F6F3EE]/50 hover:border-[#F6F3EE] transition-colors drop-shadow-md"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CURATOR STATEMENT */}
      <section className="py-40 px-6 md:px-24 flex flex-col items-center justify-center bg-background text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.4] text-foreground mb-8">
            &quot;Collected with restraint.<br/>Chosen for emotional permanence.&quot;
          </h2>
          <p className="text-muted text-sm tracking-widest uppercase">
            A sanctuary for works that demand attention without shouting.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: FEATURED WORKS */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex justify-between items-end"
        >
          <h2 className="font-serif text-3xl md:text-4xl">Selected Works</h2>
          <Link href="/collections" className="text-xs tracking-widest uppercase hover:text-muted transition-colors border-b border-muted/30 pb-1">
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {featuredWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
              className="group"
            >
              <Link href={`/artwork/${work.slug}`} className="block w-full h-full cursor-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/10 mb-6">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-500" />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl group-hover:text-muted transition-colors duration-500">{work.title}</h3>
                    <p className="text-sm text-muted/80 mt-1">{work.artist}</p>
                  </div>
                  <p className="text-xs text-muted/60 tracking-widest mt-1 md:mt-2">${work.price.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: NEWSLETTER */}
      <section className="py-40 px-6 flex flex-col items-center justify-center text-center bg-[#f0eee9]">
        <div className="max-w-xl w-full">
          <h2 className="text-xs tracking-widest uppercase text-muted mb-8">Private Collector List</h2>
          <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-12">
            Receive exhibition releases and early acquisition access.
          </p>
          <form className="w-full flex border-b border-foreground/30 hover:border-foreground transition-colors pb-3 relative group" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted/50 font-sans text-center"
              required
            />
            <button type="submit" className="absolute right-0 text-xs uppercase tracking-widest font-medium hover:text-muted transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
