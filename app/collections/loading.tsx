export default function CollectionsLoading() {
  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-32 max-w-[1600px] mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
        <div className="h-16 bg-muted/10 w-64 mb-6" />
        <div className="h-4 bg-muted/10 w-96 max-w-full" />
      </div>

      {/* Grid skeleton */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-x-10 lg:gap-x-16 w-full">
        {[...Array(6)].map((_, idx) => {
          const heights = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5.5]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/4.8]"];
          return (
            <div key={idx} className="break-inside-avoid mb-16 md:mb-24 lg:mb-32 flex flex-col">
              <div className={`relative w-full overflow-hidden bg-muted/10 mb-6 ${heights[idx % heights.length]}`} />
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 px-1">
                <div>
                  <div className="h-6 bg-muted/10 w-40 mb-2" />
                  <div className="h-4 bg-muted/10 w-24" />
                </div>
                <div className="h-3 bg-muted/10 w-16" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
