import prisma from '@/lib/prisma';
import type { ArtworkCard, ArtworkDetail, ArtworkFull, ArtworkFormData } from '@/types/artwork';

// Generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Ensure slug uniqueness by appending a counter if needed
async function ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
  let candidate = slug;
  let counter = 1;

  while (true) {
    const existing = await prisma.artwork.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return candidate;
    }

    candidate = `${slug}-${counter}`;
    counter++;
  }
}

// Select clauses for different use cases
const cardSelect = {
  id: true,
  slug: true,
  title: true,
  artist: true,
  price: true,
  imageUrl: true,
  featured: true,
} as const;

const detailSelect = {
  id: true,
  slug: true,
  title: true,
  artist: true,
  price: true,
  dimensions: true,
  medium: true,
  year: true,
  framed: true,
  description: true,
  story: true,
  imageUrl: true,
  featured: true,
  published: true,
} as const;

// ─── Public Queries ───────────────────────────────────────

export async function getPublishedArtworks(): Promise<ArtworkCard[]> {
  return prisma.artwork.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: cardSelect,
  });
}

export async function getFeaturedArtworks(limit = 3): Promise<ArtworkCard[]> {
  return prisma.artwork.findMany({
    where: { featured: true, published: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: cardSelect,
  });
}

export async function getArtworkBySlug(slug: string): Promise<ArtworkDetail | null> {
  return prisma.artwork.findUnique({
    where: { slug },
    select: detailSelect,
  });
}

export async function getArtworkById(id: string): Promise<ArtworkDetail | null> {
  return prisma.artwork.findUnique({
    where: { id },
    select: detailSelect,
  });
}

export async function getHeroImages(titles: string[]): Promise<string[]> {
  const artworks = await prisma.artwork.findMany({
    where: { title: { in: titles }, published: true },
    select: { title: true, imageUrl: true },
  });

  return titles
    .map((t) => artworks.find((a) => a.title === t)?.imageUrl)
    .filter(Boolean) as string[];
}

// ─── Admin Queries ────────────────────────────────────────

export async function getAllArtworks(): Promise<ArtworkFull[]> {
  return prisma.artwork.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createArtwork(data: ArtworkFormData): Promise<ArtworkFull> {
  const slug = await ensureUniqueSlug(generateSlug(data.title));
  return prisma.artwork.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function updateArtwork(
  id: string,
  data: Partial<ArtworkFormData>
): Promise<ArtworkFull> {
  const updateData: Record<string, unknown> = { ...data };

  // Regenerate slug if title changed
  if (data.title) {
    updateData.slug = await ensureUniqueSlug(generateSlug(data.title), id);
  }

  return prisma.artwork.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteArtwork(id: string): Promise<ArtworkFull> {
  return prisma.artwork.delete({
    where: { id },
  });
}

export async function togglePublish(id: string): Promise<ArtworkFull> {
  const artwork = await prisma.artwork.findUnique({
    where: { id },
    select: { published: true },
  });

  if (!artwork) throw new Error('Artwork not found');

  return prisma.artwork.update({
    where: { id },
    data: { published: !artwork.published },
  });
}
