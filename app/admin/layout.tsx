"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b border-border/50 py-4 px-6 md:px-12 flex justify-between items-center">
          <Link href="/admin" className="font-serif text-xl tracking-widest uppercase">
            Admin
          </Link>
          <div className="flex items-center space-x-6 text-xs tracking-widest uppercase text-muted">
            <Link href="/" target="_blank" className="hover:text-foreground transition-colors">
              View Site
            </Link>
            <Link href="/api/auth/signout" className="hover:text-foreground transition-colors">
              Sign Out
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
