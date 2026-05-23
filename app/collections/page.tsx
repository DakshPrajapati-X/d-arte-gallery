import { getPublishedArtworks } from "@/lib/db/artworks";
import CollectionGrid from "./CollectionGrid";

export default async function CollectionsPage() {
  const artworks = await getPublishedArtworks();

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-32 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Collection</h1>
        <p className="text-muted max-w-xl text-sm md:text-base leading-relaxed">
          A curated selection of original works and limited edition prints. Each piece is crafted with profound attention to texture, light, and silence.
        </p>
      </div>

      {artworks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="font-serif text-2xl text-muted mb-4">No works available</p>
          <p className="text-sm text-muted/60">New pieces are being curated. Check back soon.</p>
        </div>
      ) : (
        <CollectionGrid artworks={artworks} />
      )}
    </div>
  );
}
