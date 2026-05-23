import { getFeaturedArtworks, getHeroImages } from "@/lib/db/artworks";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  const featuredWorks = await getFeaturedArtworks(3);

  // Curated hero sequence
  const curatedTitles = ["Silence in Space", "The Weight of Light"];
  const heroImages = await getHeroImages(curatedTitles);

  // Fallback if the database doesn't have them
  const finalHeroImages = heroImages.length === 2 ? heroImages : [
    "/images/artwork-1.jpg",
    "/images/artwork-3.jpg"
  ];

  return <HomeClient featuredWorks={featuredWorks} heroImages={finalHeroImages} />;
}
