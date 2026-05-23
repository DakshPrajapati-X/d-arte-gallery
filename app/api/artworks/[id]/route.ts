import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getArtworkById, updateArtwork, deleteArtwork } from '@/lib/db/artworks';
import { validateArtworkInput } from '@/lib/validations/artwork';
import { deleteImage } from '@/lib/cloudinary';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const artwork = await getArtworkById(id);

    if (!artwork) {
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('GET /api/artworks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validation = validateArtworkInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const artwork = await updateArtwork(id, validation.data);
    
    // Invalidate caches
    revalidatePath('/');
    revalidatePath('/collections');
    revalidatePath(`/artwork/${artwork.slug}`);
    
    return NextResponse.json(artwork);
  } catch (error) {
    console.error('PUT /api/artworks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update artwork' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const artwork = await deleteArtwork(id);

    // Clean up Cloudinary image
    if (artwork.imageUrl.includes('res.cloudinary.com')) {
      const parts = artwork.imageUrl.split('/upload/');
      if (parts[1]) {
        const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
        const publicId = pathAfterUpload.replace(/\.[^.]+$/, '');
        try {
          await deleteImage(publicId);
        } catch (e) {
          console.error('Failed to delete Cloudinary image:', e);
        }
      }
    }

    // Invalidate caches
    revalidatePath('/');
    revalidatePath('/collections');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/artworks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete artwork' },
      { status: 500 }
    );
  }
}
