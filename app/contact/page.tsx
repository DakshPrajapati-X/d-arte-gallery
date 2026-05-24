"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { contactAction } from "@/app/actions/contact";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-32 max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
      {/* Left: Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3"
      >
        <h1 className="font-serif text-5xl mb-8">Inquiries</h1>
        <div className="space-y-12 text-sm text-muted">
          <div>
            <h2 className="uppercase tracking-widest text-foreground mb-4">Studio</h2>
            <p>Original works, commissions,</p>
            <p>and selected inquiries.</p>
          </div>
          <div>
            <h2 className="uppercase tracking-widest text-foreground mb-4">Contact</h2>
            <p><a href="mailto:arrtholic@gmail.com" className="hover:text-foreground transition-colors">arrtholic@gmail.com</a></p>
            <p className="mt-4"><a href="tel:+919411356819" className="hover:text-foreground transition-colors">+91 9411356819</a></p>
            <p className="mt-8 opacity-70">Responses are typically shared within a few days.</p>
          </div>
        </div>
      </motion.div>

      {/* Right: Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-2/3"
      >
        <form 
          className="space-y-8" 
          id="contact-form"
          action={async (formData) => {
            const loadingToast = toast.loading("Sending...");
            const result = await contactAction(formData);
            if (result.success) {
              toast.success(result.message, { id: loadingToast });
              (document.getElementById('contact-form') as HTMLFormElement)?.reset();
            } else {
              toast.error(result.error, { id: loadingToast });
            }
          }}
        >
          {/* Honeypot field for spam protection */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full py-4 bg-transparent border-b border-border outline-none focus:border-foreground transition-colors peer placeholder-transparent"
                placeholder="Name"
                required
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-muted/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-muted uppercase tracking-widest">
                Name
              </label>
            </div>
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full py-4 bg-transparent border-b border-border outline-none focus:border-foreground transition-colors peer placeholder-transparent"
                placeholder="Email"
                required
              />
              <label htmlFor="email" className="absolute left-0 top-4 text-muted/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-muted uppercase tracking-widest">
                Email
              </label>
            </div>
          </div>

          <div className="relative group pt-8">
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full py-4 bg-transparent border-b border-border outline-none focus:border-foreground transition-colors peer placeholder-transparent resize-none"
              placeholder="Message"
              required
            />
            <label htmlFor="message" className="absolute left-0 top-12 text-muted/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-12 peer-focus:top-0 peer-focus:text-xs peer-focus:text-muted uppercase tracking-widest">
              Message
            </label>
          </div>

          <button type="submit" className="py-4 px-12 bg-transparent text-foreground border border-foreground text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors disabled:opacity-50">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}
