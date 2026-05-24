"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen pt-48 pb-40 px-6 max-w-4xl mx-auto flex flex-col items-center text-center md:items-start md:text-left">
      <h1 className="font-serif text-5xl md:text-7xl mb-24 font-light tracking-wide text-neutral-900 dark:text-[#F4F0EA]">Settings</h1>
      
      <div className="space-y-24 w-full">
        <section className="border-t border-neutral-200 dark:border-[#3A3836] pt-16">
          <h2 className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 dark:text-[#A8A39D] mb-12">Appearance</h2>
          
          <div className="flex flex-col space-y-12">
            <p className="font-serif text-2xl md:text-3xl text-neutral-800 dark:text-[#EAEAEA] font-light tracking-wide leading-relaxed max-w-2xl mx-auto md:mx-0">
              Select your preferred viewing environment.
            </p>
            
            {mounted ? (
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
                <button
                  onClick={() => setTheme("light")}
                  className={`w-full sm:w-[220px] py-6 text-[11px] tracking-[0.2em] uppercase border transition-all duration-700 ease-[0.22,1,0.36,1] ${
                    theme === "light" 
                      ? "border-neutral-900 text-neutral-900 dark:border-[#F4F0EA] dark:text-[#F4F0EA]" 
                      : "border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 dark:border-[#3A3836] dark:text-[#A8A39D] dark:hover:border-[#8C8782] dark:hover:text-[#EAEAEA]"
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`w-full sm:w-[220px] py-6 text-[11px] tracking-[0.2em] uppercase border transition-all duration-700 ease-[0.22,1,0.36,1] ${
                    theme === "dark" 
                      ? "border-neutral-900 text-neutral-900 dark:border-[#F4F0EA] dark:text-[#F4F0EA]" 
                      : "border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 dark:border-[#3A3836] dark:text-[#A8A39D] dark:hover:border-[#8C8782] dark:hover:text-[#EAEAEA]"
                  }`}
                >
                  Dark Mode
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`w-full sm:w-[220px] py-6 text-[11px] tracking-[0.2em] uppercase border transition-all duration-700 ease-[0.22,1,0.36,1] ${
                    theme === "system" 
                      ? "border-neutral-900 text-neutral-900 dark:border-[#F4F0EA] dark:text-[#F4F0EA]" 
                      : "border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 dark:border-[#3A3836] dark:text-[#A8A39D] dark:hover:border-[#8C8782] dark:hover:text-[#EAEAEA]"
                  }`}
                >
                  System Default
                </button>
              </div>
            ) : (
              <div className="h-16 w-full max-w-2xl mx-auto md:mx-0 bg-neutral-100 dark:bg-[#1C1A18] animate-pulse" />
            )}
            
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-[#8C8782] pt-8">
              Note: System default will adapt to your device preferences.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
