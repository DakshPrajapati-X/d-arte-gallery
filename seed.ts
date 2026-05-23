import { PrismaClient } from '@prisma/client';

const artworks = [
  {
    id: '1',
    title: 'Silence in Space',
    artist: 'Elias Thorne',
    price: 3200,
    dimensions: '120 × 160 cm',
    medium: 'Oil on Linen',
    year: '2024',
    framed: true,
    description: 'Bring raw emotion and contemporary flair to your space with this original monochrome portrait sketch.\n\n• Captures raw emotion through expressive strokes.\n• Features dynamic linework that brings character to life.\n• Makes a striking addition to any modern art collection.',
    story: 'Painted over the course of four winter months in complete isolation, Silence in Space captures the feeling of a heavy snowfall at midnight—when the world stops spinning and everything is still.',
    image: '/images/artwork-1.jpg',
  },
  {
    id: '2',
    title: 'Fragments of Memory',
    artist: 'Clara Delacroix',
    price: 2800,
    dimensions: '100 × 100 cm',
    medium: 'Mixed Media on Canvas',
    year: '2023',
    framed: false,
    description: 'A delicate assembly of torn paper, charcoal, and washed acrylic. Delacroix explores how we piece together forgotten moments. It feels inherently nostalgic, tactile, and fragile.',
    story: 'Clara sourced the paper fragments from old letters found in an abandoned Parisian post office. Each piece holds a history that is now permanently sealed within the work.',
    image: '/images/artwork-2.jpg',
  },
  {
    id: '3',
    title: 'The Weight of Light',
    artist: 'Julian Vane',
    price: 4500,
    dimensions: '150 × 200 cm',
    medium: 'Charcoal and Pastel',
    year: '2024',
    framed: true,
    description: 'Massive, imposing, yet delicate. Vane uses light as a physical object, making the shadows feel heavier than the illuminated areas. An incredibly striking editorial piece.',
    story: 'Vane’s studio has a single skylight. He painted this over two weeks, only working during the brief 30-minute window when the sun hit his canvas directly.',
    image: '/images/artwork-3.jpg',
  },
  {
    id: '4',
    title: 'Monochrome No. 7',
    artist: 'Elias Thorne',
    price: 1900,
    dimensions: '80 × 120 cm',
    medium: 'Ink on Raw Canvas',
    year: '2022',
    framed: true,
    description: 'A study in restraint. A single, confident brushstroke dominates the raw, unprimed canvas. It is a meditation on certainty and simplicity.',
    story: 'Part of his famous "Monochrome" series, No. 7 was created using a brush Thorne crafted himself from fallen horsehair.',
    image: '/images/artwork-4.jpg',
  },
  {
    id: '5',
    title: 'Echoes',
    artist: 'Sophia Lin',
    price: 5200,
    dimensions: '200 × 200 cm',
    medium: 'Acrylic and Dust',
    year: '2024',
    framed: false,
    description: 'A massive textural landscape. Lin mixes marble dust into her acrylics to create a surface that looks like ancient stone, yet feels entirely contemporary.',
    story: 'Lin spent months collecting marble dust from the quarries of Carrara, Italy, to ensure the exact mineral composition she envisioned.',
    image: '/images/artwork-5.jpg',
  },
  {
    id: '6',
    title: 'Veiled Figures',
    artist: 'Matteo Rossi',
    price: 3600,
    dimensions: '110 × 150 cm',
    medium: 'Oil on Panel',
    year: '2023',
    framed: true,
    description: 'Classical techniques applied to abstract forms. The figures are barely discernible beneath layers of translucent glazes, creating a haunting sense of depth.',
    story: 'Rossi uses a 16th-century glazing technique, applying up to 40 micro-layers of paint over several months to achieve the luminous effect.',
    image: '/images/artwork-6.jpg',
  }
];

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🎨 Seeding D\'Arte database...\n');

  for (const artwork of artworks) {
    const slug = generateSlug(artwork.title);

    const result = await prisma.artwork.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: artwork.title,
        artist: artwork.artist,
        price: artwork.price,
        dimensions: artwork.dimensions,
        medium: artwork.medium,
        year: artwork.year,
        framed: artwork.framed,
        description: artwork.description,
        story: artwork.story,
        imageUrl: artwork.image,  // Map old 'image' field to 'imageUrl'
        featured: artwork.id === '1' || artwork.id === '3',
        published: true,
      },
    });

    console.log(`  ✓ ${result.title} (${result.slug})`);
  }

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
