import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/lib/db/artworks";
import ArtworkClient from "./ArtworkClient";

export default async function ArtworkPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const artwork = await getArtworkBySlug(slug);

  if (!artwork || !artwork.published) {
    notFound();
  }

  return <ArtworkClient artwork={artwork} />;
}
