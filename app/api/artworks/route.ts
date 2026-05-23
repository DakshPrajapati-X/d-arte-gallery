import { NextResponse } from 'next/server';
import { getAllArtworks, createArtwork } from '@/lib/db/artworks';
import { validateArtworkInput } from '@/lib/validations/artwork';

export async function GET() {
  try {
    const artworks = await getAllArtworks();
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('GET /api/artworks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateArtworkInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const artwork = await createArtwork(validation.data);
    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    console.error('POST /api/artworks error:', error);
    return NextResponse.json(
      { error: 'Failed to create artwork' },
      { status: 500 }
    );
  }
}
