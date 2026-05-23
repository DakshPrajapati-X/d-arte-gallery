"use client";

export default function ArtworkError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl mb-4">Something went wrong</h1>
      <p className="text-muted text-sm mb-8 max-w-md">
        We couldn&apos;t load this artwork. Please try again.
      </p>
      <button
        onClick={reset}
        className="border border-border/50 px-6 py-3 text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
