import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-border/30 text-xs tracking-widest uppercase text-muted bg-background">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="mb-1">&copy; 2026 D&apos;ARTE</p>
          <p className="opacity-70 dark:opacity-100 dark:text-muted/70">Curated by Daksh Prajapati</p>
        </div>
        
        <div className="flex space-x-8">
          <a href="https://www.instagram.com/arrt_holic__?igsh=MXVrdnJnc2dhbHczag==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="https://pin.it/42pnU7nPW" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Pinterest</a>
        </div>
        
        <div className="text-center md:text-right flex flex-col space-y-1">
          <a href="mailto:arrtholic@gmail.com" className="hover:text-foreground transition-colors">arrtholic@gmail.com</a>
          <a href="tel:+919411356819" className="hover:text-foreground transition-colors">+91 9411356819</a>
        </div>
      </div>
    </footer>
  );
}
