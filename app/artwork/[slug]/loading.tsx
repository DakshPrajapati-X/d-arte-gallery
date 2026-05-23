export default function ArtworkLoading() {
  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative animate-pulse">
      {/* Left: Image skeleton */}
      <div className="w-full lg:w-3/5">
        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[85vh] bg-muted/10" />
      </div>

      {/* Right: Info skeleton */}
      <div className="w-full lg:w-2/5">
        <div className="lg:sticky lg:top-32 h-auto flex flex-col space-y-6">
          <div className="h-12 bg-muted/10 w-3/4" />
          <div className="h-6 bg-muted/10 w-1/3" />
          <div className="h-8 bg-muted/10 w-1/4 mt-4" />

          <div className="border-t border-b border-border/30 py-8 space-y-6 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-muted/10 w-24" />
                <div className="h-4 bg-muted/10 w-32" />
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-4">
            <div className="h-4 bg-muted/10 w-full" />
            <div className="h-4 bg-muted/10 w-full" />
            <div className="h-4 bg-muted/10 w-3/4" />
          </div>

          <div className="h-14 bg-muted/10 w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
