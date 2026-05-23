// Shared artwork types used across server and client code

export type ArtworkFull = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  dimensions: string;
  medium: string;
  year: string;
  framed: boolean;
  description: string;
  story: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Lightweight type for collection grid cards
export type ArtworkCard = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

// Full detail view (excludes internal timestamps)
export type ArtworkDetail = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  dimensions: string;
  medium: string;
  year: string;
  framed: boolean;
  description: string;
  story: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
};

// Shape of form input data for creating/updating artworks
export type ArtworkFormData = {
  title: string;
  artist: string;
  price: number;
  dimensions: string;
  medium: string;
  year: string;
  framed: boolean;
  description: string;
  story: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
};

// Server action result type
export type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};
