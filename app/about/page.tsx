"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* 1. Cinematic Intro Image */}
      <section className="relative h-[80vh] w-full flex items-end justify-center pb-20 overflow-hidden bg-muted/10">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          {/* We use an existing artwork as a mood image */}
          <Image
            src="/images/artwork-4.jpg"
            alt="Studio process"
            fill
            className="object-cover opacity-80"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 text-center max-w-3xl px-6"
        >
          <h1 className="font-serif text-[clamp(40px,5vw,80px)] leading-[1] mb-6">
            The Philosophy of<br />Quiet Luxury
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            A sanctuary for profound observation
          </p>
        </motion.div>
      </section>

      {/* 2. Founder Philosophy Split Layout */}
      <section className="py-32 px-6 md:px-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-5/12"
          >
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.3] text-foreground">
              &quot;Art should not demand your attention. It should reward it.&quot;
            </h2>
            <div className="w-12 h-[1px] bg-foreground mt-12 mb-8"></div>
            <p className="text-xs tracking-widest uppercase text-muted">Daksh Prajapati — Founder</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-7/12 space-y-8 text-sm md:text-base text-muted/90 leading-relaxed font-sans"
          >
            <p>
              D&apos;ARTE was founded on the principle that the most powerful experiences are often the quietest. In a world saturated with visual noise and instantaneous consumption, we seek to cultivate a space for contemplation.
            </p>
            <p>
              Our artists are selected not for their adherence to trends, but for their deep, almost obsessive engagement with their materials. From the way light interacts with raw unprimed linen, to the weight of charcoal on handmade paper, every texture tells a story.
            </p>
            <p>
              We view the acquisition of art not as a transaction, but as the beginning of a lifelong relationship with an object that possesses its own inner life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Fullscreen Editorial Quote */}
      <section className="py-40 px-6 flex items-center justify-center bg-[#f0eee9] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <h3 className="font-serif text-3xl md:text-5xl leading-[1.4] text-foreground/90">
            &quot;We collect with restraint, prioritizing emotional permanence over fleeting aesthetics.&quot;
          </h3>
        </motion.div>
      </section>

      {/* 4. Minimal Storytelling Blocks & 5. Curated Imagery */}
      <section className="py-32 px-6 md:px-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] w-full bg-muted/10 overflow-hidden"
          >
            <Image src="/images/artwork-3.jpg" alt="Curated aesthetics" fill className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="pl-0 md:pl-12"
          >
            <span className="text-xs tracking-widest uppercase text-muted mb-6 block">Materiality</span>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">The Tactile Experience</h2>
            <p className="text-muted leading-relaxed max-w-md">
              True luxury lies in the details that can only be felt in person. The grain of the wood, the weave of the canvas, the slight imperfection of a hand-pulled print. These are the elements that breathe life into a space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="py-32 px-6 border-t border-border/30 flex flex-col items-center justify-center text-center">
        <span className="text-xs tracking-widest uppercase text-muted mb-4 block">Acquisitions</span>
        <h2 className="font-serif text-4xl mb-10">Begin Your Collection</h2>
        <Link href="/contact" className="text-xs tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted transition-colors">
          Contact the Curator
        </Link>
      </section>
    </div>
  );
}
