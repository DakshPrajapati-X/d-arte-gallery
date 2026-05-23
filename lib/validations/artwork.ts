import type { ArtworkFormData } from '@/types/artwork';

export type ValidationResult = {
  success: boolean;
  errors: string[];
  data?: ArtworkFormData;
};

export function validateArtworkInput(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Invalid input data'] };
  }

  const d = data as Record<string, unknown>;

  // Required string fields
  const requiredStrings = [
    'title', 'artist', 'dimensions', 'medium', 'year', 'description', 'story', 'imageUrl',
  ] as const;

  for (const field of requiredStrings) {
    if (!d[field] || typeof d[field] !== 'string' || (d[field] as string).trim().length === 0) {
      errors.push(`${field} is required`);
    }
  }

  // Price validation
  const price = typeof d.price === 'string' ? parseFloat(d.price) : d.price;
  if (typeof price !== 'number' || isNaN(price) || price < 0) {
    errors.push('Price must be a positive number');
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    errors: [],
    data: {
      title: (d.title as string).trim(),
      artist: (d.artist as string).trim(),
      price: price as number,
      dimensions: (d.dimensions as string).trim(),
      medium: (d.medium as string).trim(),
      year: (d.year as string).trim(),
      framed: Boolean(d.framed),
      description: (d.description as string).trim(),
      story: (d.story as string).trim(),
      imageUrl: (d.imageUrl as string).trim(),
      featured: Boolean(d.featured),
      published: Boolean(d.published),
    },
  };
}
