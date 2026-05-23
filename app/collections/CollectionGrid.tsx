"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ArtworkCard } from "@/types/artwork";

export default function CollectionGrid({ artworks }: { artworks: ArtworkCard[] }) {
  const getAspectClass = (idx: number, featured: boolean) => {
    if (featured) return "aspect-[4/6]"; // Featured pieces are deliberately taller

    // Soft, curated cycle of subtle height variations to create an editorial rhythm
    // avoiding the extreme randomness of a standard Pinterest grid.
    const sequence = [
      "aspect-[4/5]",    // Standard
      "aspect-[3/4]",    // Slightly taller
      "aspect-[4/4.8]",  // Slightly shorter
      "aspect-[4/5.5]",  // Taller
      "aspect-[4/5]",    // Standard
      "aspect-[3/4.2]"   // Taller variation
    ];
    return sequence[idx % sequence.length];
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-x-10 lg:gap-x-16 w-full">
      {artworks.map((work, idx) => (
        <motion.div
          key={work.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group break-inside-avoid mb-16 md:mb-24 lg:mb-32 flex flex-col"
        >
          <Link href={`/artwork/${work.slug}`} className="block w-full h-full cursor-none">
            <div className={`relative w-full overflow-hidden bg-muted/10 mb-6 ${getAspectClass(idx, work.featured)}`}>
              <Image
                src={work.imageUrl}
                alt={work.title}
                fill
                quality={90}
                priority={idx < 4}
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-500" />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 px-1">
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
  );
}
